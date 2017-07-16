import { copyDeep, ifNull, mapObject, mapToObject } from 'jsUtils'
import { EntityType, FocusMode, ParticipationMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'
import validators from 'validators'
import { handleEntityEditUpdated } from '../shared'

let subscribeEditing = (events, store) => {

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

            actionsBatch.push(actions.setFocus(EntityType.item, FocusMode.edited, itemId, e));

            store.dispatchBatch(actionsBatch, e);
		});
    
    events.itemEdit_Updated.stream
		.subscribe(e => store.dispatchBatch(
            handleEntityEditUpdated(store.getState(), EntityType.item, e.data.itemId, e.data.updateCommand, e),
			e
        ));

	events.participationEdit_ModeChanged.stream
		.subscribe(e => store.dispatch(
            actions.setParticipationEditMode(e.data.mode, e)
        ));

    events.participationEdit_Updated.stream
		.subscribe(e => store.dispatchBatch(
            handleEntityEditUpdated(store.getState(), EntityType.participation, e.data.itemId, e.data.updateCommand, e),
			e
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

				store.dispatchBatch(errorActions, e);

                return;
            }

			let item = { name: itemData.name, price: itemData.price };
			let participationMode = queries.participationEditMode(state);
			let participation = mapParticipationEditToEntity(item, participationData, participationMode);
			let participatingParticipantIdsCache = getNewParticipatingParticipantIdsCache(participation);

			store.dispatchBatch([
                actions.updateEntity(EntityType.participation, itemId, participation, e),
                actions.updateEntity(EntityType.item, itemId, item, e),
                actions.clearFocus(EntityType.item, e),
                actions.clearEdit(EntityType.participation, itemId, e),
                actions.clearEdit(EntityType.item, itemId, e),
				actions.setParticipatingParticipantIdsCache(participatingParticipantIdsCache, e)
			], e);
		});
	
	events.itemEdit_Cancelled.stream
		.subscribe(e => store.dispatchBatch([
            actions.clearFocus(EntityType.item, e),
            actions.clearEdit(EntityType.participation, e.data.itemId, e),
		    actions.clearEdit(EntityType.item, e.data.itemId, e)
		], e));

};

let createParticipationEdit = (state, itemId) => {
	let participantIds = queries.entityIds(state, EntityType.participant);
	let itemParticipations = ifNull(queries.entityData(state, EntityType.participation, itemId), () => ({}));

	return mapToObject(
		participantIds,
		id => {
			let participation = itemParticipations[id];

			return participation != null
				? {
					contributed: participation.contribution > 0,
					contribution: participation.contribution,
					participates: participation.participates
				}
				: {
					contributed: false,
					contribution: 0,
					participates: false
				};
		}
	);
};

let mapParticipationEditToEntity = (item, participationEdit, participationMode) => {
	if (participationMode === ParticipationMode.even) {
		let filteredParticipation = mapObject(
			participationEdit,
			participation => (participation.contributed || participation.participates) ? participation : undefined);

		let contributingParticipantsCount = Object.values(filteredParticipation).filter(x => x.contributed).length;
		let contribution = item.price / contributingParticipantsCount;
		let result = {};

		for (let [participantId, participation] of Object.entries(filteredParticipation)) {
			result[participantId] = {
				contribution: participation.contributed ? contribution : 0,
				participates: participation.participates
			};
		}

		return result;
	} else {
		let result = {};
	
		for (let [participantId, participation] of Object.entries(participationEdit)) {
			if (participation.contribution > 0 || participation.participates) {
				result[participantId] = {
					contribution: participation.contribution,
					participates: participation.participates
				};
			}
		}

		return result;
	}
};

let getNewParticipatingParticipantIdsCache = itemParticipations =>
	Object.entries(itemParticipations)
		.filter(([participantId, participation]) => participation.participates)
		.map(([participantId, _]) => parseInt(participantId));

export default subscribeEditing;
