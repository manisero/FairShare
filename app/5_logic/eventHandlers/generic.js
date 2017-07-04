import update from 'immutability-helper'
import { copyDeep } from 'jsUtils'
import { entityConstructors, FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'
import validators from './../validators'
import { getNextEntityId, actionBatches } from './helpers'

let subscribe = (events, store) => {

	events.entitySelected.stream
		.subscribe(e => store.dispatch(actions.setFocus(e.data.entity, e.data.id, FocusMode.selected, e)));
	
	events.entityDeselected.stream
		.subscribe(e => store.dispatch(actions.clearFocus(e.data.entity, e)));

	events.entityAdded.stream
		.subscribe(e => {
			let state = store.getState();
			let entity = e.data.entity;

			let id = getNextEntityId(state, entity);
			let data = entityConstructors[entity]();
			let editData = copyDeep(data);

			store.dispatchBatch([
				actions.addEntity(entity, id, data, e),
				actions.setEdit(entity, id,editData, e),
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
		.subscribe(e => store.dispatchBatch(actionBatches.entityEdit_Submitted(store.getState(), e.data.entity, e.data.id, e)));

	events.entityEdit_Cancelled.stream
		.subscribe(e => store.dispatchBatch(actionBatches.entityEdit_Cancelled(e.data.entity, e)));
	
	events.entityDelete_Started.stream
		.subscribe(e => store.dispatch(actions.setFocus(e.data.entity, e.data.id, FocusMode.deleted, e)));
	
	events.entityDelete_Submitted.stream
		.subscribe(e => {
			let { entity, id } = e.data;

			// TODO: When deleting Participant, delete corresponding Contributions
			store.dispatchBatch([
				actions.deleteEntity(entity, id, e),
				actions.clearFocus(entity, e),
				actions.clearEdit(entity, id, e)
			]);
		});

	events.entityDelete_Cancelled.stream
		.subscribe(e => store.dispatch(actions.clearFocus(e.data.entity, e)));
	
};

export default subscribe;
