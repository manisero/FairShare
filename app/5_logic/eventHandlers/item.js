import { copyDeep, ifNull, mapToObject, unsetFields } from 'jsUtils'
import { EntityType, entityConstructors, FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'
import validators from './../validators'
import { getNextEntityId, handleEntityEditUpdated } from './shared'

let subscribe = (events, store) => {

    events.itemSelected.stream
		.subscribe(e => store.dispatch(
            actions.setFocus(EntityType.item, e.data.itemId, FocusMode.selected, e)
        ));
    
    events.itemDeselected.stream
		.subscribe(e => store.dispatch(
            actions.clearFocus(EntityType.item, e)
        ));

	events.itemAdded.stream
		.subscribe(e => {
			let state = store.getState();
			
			let itemId = getNextEntityId(state, EntityType.item);
			let item = entityConstructors[EntityType.item]();
			let participation = {};
			let itemEdit = copyDeep(item);
			let participationEdit = createParticipationEdit(state, itemId);

			store.dispatchBatch([
				actions.addEntity(EntityType.item, itemId, item, e),
				actions.addEntity(EntityType.participation, itemId, participation, e),
				actions.setEdit(EntityType.item, itemId, itemEdit, e),
				actions.setEdit(EntityType.participation, itemId, participationEdit, e),
				actions.setFocus(EntityType.item, itemId, FocusMode.edited, e)
			]);
		});

	events.itemEdit_Started.stream
		.subscribe(e => {
			let state = store.getState();
			let itemId = e.data.itemId;
            let actionsBatch = [];

            if (queries.edit(state, EntityType.item, itemId) == null) {
                let itemEdit = copyDeep(queries.entityData(state, EntityType.item, itemId));

				actionsBatch.push(actions.setEdit(EntityType.item, itemId, itemEdit, e));
            }

			// TODO: Note that new Participants won't be added to existing edit
			if (queries.edit(state, EntityType.participation, itemId) == null) {
				let participationEdit = createParticipationEdit(state, itemId);

				actionsBatch.push(actions.setEdit(EntityType.participation, itemId, participationEdit, e));
            }

            actionsBatch.push(actions.setFocus(EntityType.item, itemId, FocusMode.edited, e));

            store.dispatchBatch(actionsBatch);
		});
    
    events.itemEdit_Updated.stream
		.subscribe(e => store.dispatchBatch(
            handleEntityEditUpdated(store.getState(), EntityType.item, e.data.itemId, e.data.updateCommand, e)
        ));
    
    events.participationEdit_Updated.stream
		.subscribe(e => store.dispatchBatch(
            handleEntityEditUpdated(store.getState(), EntityType.participation, e.data.itemId, e.data.updateCommand, e)
        ));
	
	events.itemEdit_Submitted.stream
		.subscribe(e => {
			let state = store.getState();
			let itemId = e.data.itemId;
            let itemData = queries.edit(state, EntityType.item, itemId).data;
            let participationData = queries.edit(state, EntityType.participation, itemId).data;

			let itemError = validators.item(itemData, state);
			let participationError = validators.participation(participationData, state);

            if (itemError != null || participationError != null) {
				let errorActions = [];

				if (itemError != null) {
					errorActions.push(
						actions.setEditError(EntityType.item, itemId, itemError, e)
					);
				}

				if (participationError != null) {
					errorActions.push(
						actions.setEditError(EntityType.participation, itemId, participationError, e)
					);
				}

				store.dispatchBatch(errorActions);

                return;
            }

			let item = copyDeep(itemData);
			let participation = mapParticipationEditToEntity(participationData);

			store.dispatchBatch([
                actions.updateEntity(EntityType.participation, itemId, participation, e),
                actions.updateEntity(EntityType.item, itemId, item, e),
                actions.clearFocus(EntityType.item, e),
                actions.clearEdit(EntityType.participation, itemId, e),
                actions.clearEdit(EntityType.item, itemId, e)
			]);
		});
	
	events.itemEdit_Cancelled.stream
		.subscribe(e => store.dispatchBatch([
            actions.clearFocus(EntityType.item, e),
            actions.clearEdit(EntityType.participation, e.data.itemId, e),
		    actions.clearEdit(EntityType.item, e.data.itemId, e)
		]));
    
    events.itemDelete_Started.stream
		.subscribe(e => store.dispatch(
            actions.setFocus(EntityType.item, e.data.itemId, FocusMode.deleted, e)
        ));
    
    events.itemDelete_Submitted.stream
		.subscribe(e => {
			let itemId = e.data.itemId;

			store.dispatchBatch([
				actions.deleteEntity(EntityType.participation, itemId, e),
				actions.deleteEntity(EntityType.item, itemId, e),
				actions.clearFocus(EntityType.item, e),
				actions.clearEdit(EntityType.participation, itemId, e),
				actions.clearEdit(EntityType.item, itemId, e)
			]);
		});

	events.itemDelete_Cancelled.stream
		.subscribe(e => store.dispatch(
            actions.clearFocus(EntityType.item, e)
        ));

};

let createParticipationEdit = (state, itemId) => {
	let participantIds = queries.entityIds(state, EntityType.participant);
	let itemParticipations = ifNull(queries.entityData(state, EntityType.participation, itemId), () => ({}));

	return mapToObject(
		participantIds,
		id => ifNull(itemParticipations[id], () => entityConstructors.participation())
	);
};

let mapParticipationEditToEntity = participationEdit => {
	let participation = copyDeep(participationEdit);

	unsetFields(participation, x => {
		return !(x.contribution > 0 || x.participates);
	});

	return participation;
};

export default subscribe;
