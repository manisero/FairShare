import { EntityType, FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'

let subscribeDeleting = (events, store) => {

	events.participantDelete_Requested.stream
		.subscribe(e => {
			let state = store.getState();
			let participantId = e.data.participantId;
			
			if (shouldAllowDeletion(state, participantId)) {
				events.participantDelete_Allowed(e.data.participantId);
			} else {
				events.participantDelete_Rejected(e.data.participantId);
			}
		});
	
	events.participantDelete_Allowed.stream
		.subscribe(e => store.dispatch(
            actions.setFocus(EntityType.participant, FocusMode.deleted, e.data.participantId, e)
        ));

	events.participantDelete_Rejected.stream
		.subscribe(e => store.dispatch(
            actions.setFocus(EntityType.participant, FocusMode.deleteRejected, e.data.participantId, e)
        ));
    
    events.participantDelete_Submitted.stream
		.subscribe(e => {
			let state = store.getState();
			let participantId = e.data.participantId;

			if (!shouldAllowDeletion(state, participantId)) {
				events.participantDelete_Rejected(e.data.participantId);
				return;
			}

			let cleanUpParticipationsActions = getCleanUpParticipationsActions(state, participantId, e);
			let cleanUpParticipationEditsActions = getCleanUpParticipationEditsActions(state, participantId, e);

			store.dispatchBatch([
				actions.clearFocus(EntityType.participant, e),
				...cleanUpParticipationEditsActions,
				actions.clearEdit(EntityType.participant, participantId, e),
				...cleanUpParticipationsActions,
				actions.deleteEntity(EntityType.participant, participantId, e)
			], e);

			events.settlementRequested();
		});

	events.participantDelete_Cancelled.stream
		.subscribe(e => store.dispatch(
            actions.clearFocus(EntityType.participant, e)
        ));

};

let shouldAllowDeletion = (state, participantId) => {
	let itemsParticipantIsInvolvedIn = queries.itemsParticipantIsInvolvedIn(state, participantId);
	
	return itemsParticipantIsInvolvedIn.length === 0;
};

let getCleanUpParticipationsActions = (state, participantId, origin) => {
	let participations = queries.entityAllData(state, EntityType.participation);
	let cleanUpParticipationsActions = [];

	Object.keys(participations).forEach(itemId => {
		let participation = participations[itemId];
		
		if (participantId in participation) {
			let newParticipation = Object.assign({}, participation);
			delete newParticipation[participantId];

			cleanUpParticipationsActions.push(
				actions.updateEntity(EntityType.participation, itemId, newParticipation, origin)
			);
		}
	});

	return cleanUpParticipationsActions;
};

let getCleanUpParticipationEditsActions = (state, participantId, origin) => {
	let participationEdits = queries.allEdits(state, EntityType.participation);
	let cleanUpParticipationEditsActions = [];

	Object.keys(participationEdits).forEach(itemId => {
		let participationEdit = participationEdits[itemId].data;
		
		if (participantId in participationEdit) {
			let newEdit = Object.assign({}, participationEdit);
			delete newEdit[participantId];

			cleanUpParticipationEditsActions.push(
				actions.setEdit(EntityType.participation, itemId, newEdit, origin),
				actions.clearEditError(EntityType.participation, itemId, origin)
			);
		}
	});

	return cleanUpParticipationEditsActions;
};

export default subscribeDeleting;
