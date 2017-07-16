import { mapToObject } from 'jsUtils'
import { EntityType, entityConstructors, FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'
import validators from 'validators'
import { getNextEntityId, handleEntityAddNextUpdated } from '../shared'
import { mapParticipationEditToEntity, handleParticipatingParticipantIdsChange } from './shared'

let subscribeAdding = (events, store) => {

	events.itemAdd_Started.stream
		.subscribe(e => {
			let state = store.getState();
			let toAdd = queries.toAdd_next(state, EntityType.item);
			let actionsBatch = [];

			if (toAdd == null) {
				let newItem = entityConstructors[EntityType.item]();
				let newParticipation = createParticipationEditForNewItem(state);

				actionsBatch.push(actions.setNextToAdd(EntityType.item, newItem, e));
				actionsBatch.push(actions.setNextToAdd(EntityType.participation, newParticipation, e));
			} // else TODO: handle Participants added since last add or refactor Participation to handle this automatically (display ParticiaptionEditor per Participant, not per Participation)

			actionsBatch.push(actions.setFocus(EntityType.item, FocusMode.added, null, e));

			store.dispatchBatch(actionsBatch, e);
		});
	
	events.itemAdd_Updated.stream
		.subscribe(e => store.dispatchBatch(
			handleEntityAddNextUpdated(store.getState(), EntityType.item, e.data.updateCommand, e),
			e)
		);
	
	events.participationAdd_Updated.stream
		.subscribe(e => store.dispatchBatch(
			handleEntityAddNextUpdated(store.getState(), EntityType.participation, e.data.updateCommand, e),
			e)
		);
	
	events.itemAdd_Submitted.stream
		.subscribe(e => {
			let state = store.getState();
			let itemData = queries.toAdd_next(state, EntityType.item);
            let participationData = queries.toAdd_next(state, EntityType.participation);

			let itemError = validators.item(itemData, state);
			let participationError = validators.participation(participationData, state);

			if (itemError != null || participationError != null) {
				let errorActions = [];

				if (itemError != null) {
					errorActions.push(actions.setNextToAddError(EntityType.item, itemError, e));
				}

				if (participationError != null) {
					errorActions.push(actions.setNextToAddError(EntityType.participation, participationError, e));
				}

				store.dispatchBatch(errorActions, e);

                return;
            }

			let itemId = getNextEntityId(state, EntityType.item);
			let item = { name: itemData.name, price: itemData.price };
			let participationMode = queries.participationEditMode(state);
			let participation = mapParticipationEditToEntity(item, participationData, participationMode);

			store.dispatchBatch([
				actions.addEntity(EntityType.item, itemId, item, e),
				actions.addEntity(EntityType.participation, itemId, participation, e),
				actions.clearFocus(EntityType.item, e), // TODO: Start adding next Item
				actions.clearToAdd(EntityType.participation, e),
				actions.clearToAdd(EntityType.item, e),
				...handleParticipatingParticipantIdsChange(participation, e)
			], e);
		});
	
	events.itemAdd_Cancelled.stream
		.subscribe(e => store.dispatchBatch([
			actions.clearFocus(EntityType.item, e),
			actions.clearToAdd(EntityType.participation, e),
			actions.clearToAdd(EntityType.item, e)
		], e));
};

let createParticipationEditForNewItem = state => {
	let participantIds = queries.entityIds(state, EntityType.participant);
	let participatingParticipantIds = getDefaultParticipatingParticipantIds(state);

	return mapToObject(
		participantIds,
		id => ({
			contributed: false,
			contribution: 0,
			participates: participatingParticipantIds.includes(id)
		})
	);
};

let getDefaultParticipatingParticipantIds = state => {
	let cache = queries.participatingParticipantIdsCache(state);
	
	if (cache != null) {
		return cache;
	}

	return queries.entityIds(state, EntityType.participant);
};

export default subscribeAdding;
