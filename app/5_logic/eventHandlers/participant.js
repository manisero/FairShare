import update from 'immutability-helper'
import { copyDeep } from 'jsUtils'
import { EntityType, entityConstructors, FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'
import validators from './../validators'
import { getNextEntityId, handleEntityEditUpdated } from './shared'

let subscribe = (events, store) => {
	subscribeSelecting(events, store);
	subscribeAdding(events, store);
	subscribeEditing(events, store);
	subscribeDeleting(events, store);
};

let subscribeSelecting = (events, store) => {

    events.participantSelected.stream
		.subscribe(e => store.dispatch(
            actions.setFocus(EntityType.participant, FocusMode.selected, e.data.participantId, e)
        ));
    
    events.participantDeselected.stream
		.subscribe(e => store.dispatch(
            actions.clearFocus(EntityType.participant, e)
        ));

};

let subscribeAdding = (events, store) => {

	events.participantsAdd_Started.stream
		.subscribe(e => {
			let toAdd = queries.toAdd_next(store.getState(), EntityType.participant);
			let actionsBatch = [];

			if (toAdd == null) {
				let next = entityConstructors[EntityType.participant]();

				actionsBatch.push(actions.setNextToAdd(EntityType.participant, next, e));
			}

			actionsBatch.push(actions.setFocus(EntityType.participant, FocusMode.added, null, e));

			store.dispatchBatch(actionsBatch);
		});

	events.participantsAdd_Added.stream
		.subscribe(e => {
			let toAdd = queries.toAdd_next(store.getState(), EntityType.participant);
			let next = entityConstructors[EntityType.participant]();

			store.dispatchBatch([
				actions.addToAdd(EntityType.participant, toAdd, e),
				actions.setNextToAdd(EntityType.participant, next, e)
			]);
		});
	
	events.participantsAdd_Updated.stream
		.subscribe(e => {
			let index = e.data.index;
			let data = queries.toAdd_added(store.getState(), EntityType.participant, index);
			let newData = update(data, e.data.updateCommand);

			store.dispatch(
				actions.updateToAdd(EntityType.participant, index, newData, e)
			);
		});
	
	events.participantsAdd_NextUpdated.stream
		.subscribe(e => {
			let data = queries.toAdd_next(store.getState(), EntityType.participant);
			let newData = update(data, e.data.updateCommand);

			store.dispatch(
				actions.setNextToAdd(EntityType.participant, newData, e)
			);
		});
	
	events.participantsAdd_Removed.stream
		.subscribe(e => store.dispatch(
			actions.removeToAdd(EntityType.participant, e.data.index, e)
		));
	
	events.participantsAdd_Submitted.stream
		.subscribe(e => {
			let state = store.getState();
			let allAdded = queries.toAdd_allAdded(state, EntityType.participant);
			let nextToAdd = queries.toAdd_next(state, EntityType.participant);
			let nextId = getNextEntityId(state, EntityType.participant);
			
			let allToAdd = [ ...allAdded, nextToAdd ].filter(x => x.name != null && x.name != '');
			let addEntityActions = [];

			for (let toAdd of allToAdd) {
				let data = entityConstructors.participant(toAdd.name, toAdd.contribution);

				addEntityActions.push(actions.addEntity(EntityType.participant, nextId, data, e));
				nextId++;
			}

			store.dispatchBatch([
				...addEntityActions,
				actions.clearFocus(EntityType.participant, e),
				actions.clearToAdd(EntityType.participant, e)
			]);
		});
	
	events.participantsAdd_Cancelled.stream
		.subscribe(e => store.dispatchBatch([
			actions.clearFocus(EntityType.participant, e),
			actions.clearToAdd(EntityType.participant, e)
		]));

};

let subscribeEditing = (events, store) => {

	events.participantEdit_Started.stream
		.subscribe(e => {
			let state = store.getState();
			let participantId = e.data.participantId;
            let actionsBatch = [];

            if (queries.edit(state, EntityType.participant, participantId) == null) {
                let participantEdit = copyDeep(queries.entityData(state, EntityType.participant, participantId));

				actionsBatch.push(actions.setEdit(EntityType.participant, participantId, participantEdit, e));
            }

            actionsBatch.push(actions.setFocus(EntityType.participant, FocusMode.edited, participantId, e));

            store.dispatchBatch(actionsBatch);
		});
    
    events.participantEdit_Updated.stream
		.subscribe(e => store.dispatchBatch(
            handleEntityEditUpdated(store.getState(), EntityType.participant, e.data.participantId, e.data.updateCommand, e)
        ));
	
	events.participantEdit_Submitted.stream
		.subscribe(e => {
			let state = store.getState();
			let participantId = e.data.participantId;
            let data = queries.edit(state, EntityType.participant, participantId).data;

			let error = validators.participant(data, state);

            if (error != null) {
                store.dispatch(
					actions.setEditError(EntityType.participant, participantId, error, e)
				);

				return;
			}

			let participant =  { name: data.name, contribution: data.contribution };

			store.dispatchBatch([
                actions.updateEntity(EntityType.participant, participantId, participant, e),
                actions.clearFocus(EntityType.participant, e),
                actions.clearEdit(EntityType.participant, participantId, e)
			]);
		});
	
	events.participantEdit_Cancelled.stream
		.subscribe(e => store.dispatchBatch([
            actions.clearFocus(EntityType.participant, e),
		    actions.clearEdit(EntityType.participant, e.data.participantId, e)
		]));

};

let subscribeDeleting = (events, store) => {

    events.participantDelete_Started.stream
		.subscribe(e => store.dispatch(
            actions.setFocus(EntityType.participant, FocusMode.deleted, e.data.participantId, e)
        ));
    
    events.participantDelete_Submitted.stream
		.subscribe(e => {
			let state = store.getState();
			let participantId = e.data.participantId;

			let cleanUpParticipationsActions = getCleanUpParticipationsActions(state, participantId);
			let cleanUpParticipationEditsActions = getCleanUpParticipationEditsActions(state, participantId);

			store.dispatchBatch([
				actions.deleteEntity(EntityType.participant, participantId, e),
				actions.clearFocus(EntityType.participant, e),
				actions.clearEdit(EntityType.participant, participantId, e),
				...cleanUpParticipationsActions,
				...cleanUpParticipationEditsActions
			]);
		});

	events.participantDelete_Cancelled.stream
		.subscribe(e => store.dispatch(
            actions.clearFocus(EntityType.participant, e)
        ));

};

let getCleanUpParticipationsActions = (state, participantId) => {
	let participations = queries.entityAllData(state, EntityType.participation);
	let cleanUpParticipationsActions = [];

	Object.keys(participations).forEach(itemId => {
		let participation = participations[itemId];
		
		if (participantId in participation) {
			let newParticipation = Object.assign({}, participation);
			delete newParticipation[participantId];

			cleanUpParticipationsActions.push(
				actions.updateEntity(EntityType.participation, itemId, newParticipation)
			);
		}
	});

	return cleanUpParticipationsActions;
};

let getCleanUpParticipationEditsActions = (state, participantId) => {
	let participationEdits = queries.allEdits(state, EntityType.participation);
	let cleanUpParticipationEditsActions = [];

	Object.keys(participationEdits).forEach(itemId => {
		let participationEdit = participationEdits[itemId].data;
		
		if (participantId in participationEdit) {
			let newEdit = Object.assign({}, participationEdit);
			delete newEdit[participantId];

			cleanUpParticipationEditsActions.push(
				actions.setEdit(EntityType.participation, itemId, newEdit),
				actions.clearEditError(EntityType.participation, itemId)
			);
		}
	});

	return cleanUpParticipationEditsActions;
};

export default subscribe;
