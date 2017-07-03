import update from 'immutability-helper'
import { copyDeep, ifNull, mapToObject } from 'jsUtils'
import { EntityType, entityConstructors, FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'
import validators from './validators'

let eventDataCreators = ({
	// Generic:
    entitySelected: (entity, id) => ({ entity,id }),
	entityDeselected: entity => ({ entity }),
	entityAdded: entity => ({ entity }),
	entityEdit_Started: (entity, id) => ({ entity, id }),
	entityEdit_Updated: (entity, id, updateCommand) => ({ entity, id, updateCommand }),
	entityEdit_Submitted: (entity, id) => ({ entity, id }),
	entityEdit_Cancelled: (entity, id) => ({ entity, id }),
	entityDelete_Started: (entity, id) => ({ entity, id }),
	entityDelete_Submitted: (entity, id) => ({ entity, id }),
	entityDelete_Cancelled: (entity, id) => ({ entity, id }),
	// Non-generic:
	itemEdit_Started: itemId => ({ itemId }),
	itemEdit_Submitted: itemId => ({ itemId }),
	itemEdit_Cancelled: itemId => ({ itemId })
});

let subscribe = (events, store) => {

	// Generic:

	events.entitySelected.stream
		.subscribe(e => store.dispatch(actions.setFocus(e.data.entity, e.data.id, FocusMode.selected, e)));
	
	events.entityDeselected.stream
		.subscribe(e => store.dispatch(actions.clearFocus(e.data.entity, e)));

	events.entityAdded.stream
		.subscribe(e => {
			let entity = e.data.entity;
			let id = queries.entityLastId(store.getState(), entity) + 1;
			let data = entityConstructors[entity]();

			store.dispatchBatch([
				actions.addEntity(entity, id, data, e),
				actions.setEdit(entity, id, data, e),
				actions.setFocus(entity, id, FocusMode.edited, e)
			]);
		});
	
	events.entityEdit_Started.stream
		.subscribe(e => {
			let state = store.getState();
			let { entity, id } = e.data;
			let actionsBatch = [];

			if (queries.edit(state, entity, id) == null) {
                let data = copyDeep(queries.entityData(state, entity, id));

				actionsBatch.push(actions.setEdit(entity, id, data, e));
            }

			actionsBatch.push(actions.setFocus(entity, id, FocusMode.edited, e));
			store.dispatchBatch(actionsBatch);
		});
	
	events.entityEdit_Updated.stream
		.subscribe(e => {
			let state = store.getState();
			let { entity, id } = e.data;
			let { data, error } = queries.edit(state, entity, id);
			let actionsBatch = [];

			let newData = update(data, e.data.updateCommand);
			actionsBatch.push(actions.setEdit(entity, id, newData, e));

			if (validators[entity] != null) {
				let newError = validators[entity](newData, state);

				if (newError != null) {
					actionsBatch.push(actions.setEditError(entity, id, newError, e));
				} else if (error != null) {
					actionsBatch.push(actions.clearEditError(entity, id, e));
				}
			}

			store.dispatchBatch(actionsBatch);
		});
	
	events.entityEdit_Submitted.stream
		.subscribe(e => {
			let { entity, id } = e.data;
			let { data, error } = queries.edit(store.getState(), entity, id);

			if (error != null) {
				return;
			}

			store.dispatchBatch([
				actions.updateEntity(entity, id, data, e),
				actions.clearFocus(entity, e),
				actions.clearEdit(entity, id, e)
			]);
		});

	events.entityEdit_Cancelled.stream
		.subscribe(e => {
			let { entity, id } = e.data;

			store.dispatchBatch([
				actions.clearFocus(entity, e),
				actions.clearEdit(entity, id, e)
			]);
		});
	
	events.entityDelete_Started.stream
		.subscribe(e => store.dispatch(actions.setFocus(e.data.entity, e.data.id, FocusMode.deleted, e)));
	
	events.entityDelete_Submitted.stream
		.subscribe(e => {
			let { entity, id } = e.data;

			store.dispatchBatch([
				actions.deleteEntity(entity, id, e),
				actions.clearFocus(entity, e),
				actions.clearEdit(entity, id, e)
			]);
		});

	events.entityDelete_Cancelled.stream
		.subscribe(e => store.dispatch(actions.clearFocus(e.data.entity, e)));

	// Non-generic:
	events.itemEdit_Started.stream
		.subscribe(e => {
			let state = store.getState();
			let itemId = e.data.itemId;

			// TODO: Note that new Participants won't be added to existing edit
			if (queries.edit(state, EntityType.participation, itemId) == null) {
				let participantIds = queries.entityIds(state, EntityType.participant);
				let itemParticipations = ifNull(queries.entityData(state, EntityType.participation, itemId), () => ({}));

                let participations = mapToObject(
					participantIds,
					id => ifNull(itemParticipations[id], () => entityConstructors.participation())
				);

				store.dispatch(actions.setEdit(EntityType.participation, itemId, participations, e));
            }

			// TODO: Refactor to call one dispatch only
			events.entityEdit_Started(EntityType.item, itemId);
		});
	
	events.itemEdit_Submitted.stream
		.subscribe(e => {
			let itemId = e.data.itemId;

			// TODO: Refactor to call one dispatch only
			// TODO: Prevent submit in case of validation errors
			events.entityEdit_Submitted(EntityType.participation, itemId);
			events.entityEdit_Submitted(EntityType.item, itemId);
		});
	
	events.itemEdit_Cancelled.stream
		.subscribe(e => {
			let itemId = e.data.itemId;

			// TODO: Refactor to call one dispatch only
			events.entityEdit_Cancelled(EntityType.participation, itemId);
			events.entityEdit_Cancelled(EntityType.item, itemId);
		});
	
};

export { eventDataCreators, subscribe };
