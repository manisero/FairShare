import { copyDeep, ifNull } from 'jsUtils'
import { EntityType, entityConstructors, FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'
import validators from './../validators'
import { getNextEntityId, handleEntityEditUpdated } from './shared'

let subscribe = (events, store) => {

    events.participantSelected.stream
		.subscribe(e => store.dispatch(
            actions.setFocus(EntityType.participant, e.data.participantId, FocusMode.selected, e)
        ));
    
    events.participantDeselected.stream
		.subscribe(e => store.dispatch(
            actions.clearFocus(EntityType.participant, e)
        ));

	events.participantAdded.stream
		.subscribe(e => {
			let state = store.getState();
			
			let participantId = getNextEntityId(state, EntityType.participant);
			let participant = entityConstructors[EntityType.participant]();
			let participantEdit = copyDeep(participant);

			store.dispatchBatch([
				actions.addEntity(EntityType.participant, participantId, participant, e),
				actions.setEdit(EntityType.participant, participantId, participantEdit, e),
				actions.setFocus(EntityType.participant, participantId, FocusMode.edited, e)
			]);
		});

	events.participantEdit_Started.stream
		.subscribe(e => {
			let state = store.getState();
			let participantId = e.data.participantId;
            let actionsBatch = [];

            if (queries.edit(state, EntityType.participant, participantId) == null) {
                let participantEdit = copyDeep(queries.entityData(state, EntityType.participant, participantId));

				actionsBatch.push(actions.setEdit(EntityType.participant, participantId, participantEdit, e));
            }

            actionsBatch.push(actions.setFocus(EntityType.participant, participantId, FocusMode.edited, e));

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

			let participant = copyDeep(data);

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
    
    events.participantDelete_Started.stream
		.subscribe(e => store.dispatch(
            actions.setFocus(EntityType.participant, e.data.participantId, FocusMode.deleted, e)
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
