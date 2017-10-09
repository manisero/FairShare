import update from 'immutability-helper'
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

			let cleanUpParticipationsToAddActions = getCleanUpParticipationsToAddActions(state, participantId, e);
			let cleanUpParticipationEditsActions = getCleanUpParticipationEditsActions(state, participantId, e);

			store.dispatchBatch([
				actions.clearFocus(EntityType.participant, e),
				...cleanUpParticipationsToAddActions,
				...cleanUpParticipationEditsActions,
				actions.clearEdit(EntityType.participant, participantId, e),
				actions.deleteEntity(EntityType.participant, participantId, e)
			], e);

			events.participantDelete_Deleted(e.data.participantId);
		});

	events.participantDelete_Cancelled.stream
		.subscribe(e => store.dispatch(
            actions.clearFocus(EntityType.participant, e)
        ));

	events.participantDelete_Deleted.stream
		.subscribe(e => events.settlementRequested());

};

let shouldAllowDeletion = (state, participantId) => {
	let itemsParticipantIsInvolvedIn = queries.itemsParticipantIsInvolvedIn(state, participantId);
	
	return itemsParticipantIsInvolvedIn.length === 0;
};

let getCleanUpParticipationsToAddActions = (state, participantId, origin) => {
	let participationsToAddNext = queries.toAdd_next(state, EntityType.participation);
	let result = [];

	if (participationsToAddNext.hasOwnProperty(participantId)) {
		let newToAdd = update(participationsToAddNext, { $unset: [participantId] });

		result.push(
			actions.setNextToAdd(EntityType.participation, newToAdd, origin),
			actions.clearNextToAddError(EntityType.participation, origin)
		);
	}

	return result;
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
