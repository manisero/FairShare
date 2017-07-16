import update from 'immutability-helper'
import { copyDeep, mapToObject } from 'jsUtils'
import { EntityType, entityConstructors, FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'
import { getNextEntityId } from '../shared'

let subscribeAdding = (events, store) => {

	// TODO: Remove
	events.itemAdded.stream
		.subscribe(e => {
			let state = store.getState();
			
			let itemId = getNextEntityId(state, EntityType.item);
			let item = entityConstructors[EntityType.item]();
			let participation = {};
			let itemEdit = copyDeep(item);
			let participationEdit = createParticipationEditForNewItem(state);

			store.dispatchBatch([
				actions.addEntity(EntityType.item, itemId, item, e),
				actions.addEntity(EntityType.participation, itemId, participation, e),
				actions.setEdit(EntityType.item, itemId, itemEdit, e),
				actions.setEdit(EntityType.participation, itemId, participationEdit, e),
				actions.setFocus(EntityType.item, FocusMode.edited, itemId, e)
			], e);
		});
	// TODO: Remove above

	events.itemAdd_Started.stream
		.subscribe(e => {
			let state = store.getState();
			let toAdd = queries.toAdd_next(state, EntityType.item);
			let actionsBatch = [];

			if (toAdd == null) {
				let newItem = entityConstructors[EntityType.item]();
				// TODO: newParticipation

				actionsBatch.push(actions.setNextToAdd(EntityType.item, newItem, e));
			} // else TODO: handle Participants added since last add or refactor Participation to handle this automatically (display ParticiaptionEditor per Participant, not per Participation)

			actionsBatch.push(actions.setFocus(EntityType.item, FocusMode.added, null, e));

			store.dispatchBatch(actionsBatch, e);
		});
	
	events.itemAdd_Updated.stream
		.subscribe(e => {
			let data = queries.toAdd_next(store.getState(), EntityType.item);
			let newData = update(data, e.data.updateCommand);

			// TODO: Validation

			store.dispatch(
				actions.setNextToAdd(EntityType.item, newData, e)
			);
		});
	
	events.participationAdd_Updated.stream
		.subscribe(e => {
			let data = queries.toAdd_next(store.getState(), EntityType.participation);
			let newData = update(data, e.data.updateCommand);

			// TODO: Validation

			store.dispatch(
				actions.setNextToAdd(EntityType.participation, newData, e)
			);
		});
	
	events.itemAdd_Submitted.stream
		.subscribe(e => {
			// TODO:
			// mapping to entities
			// validation
			// addEntity (item)
			// addEntity (participation)
			// clearFocus (item)
			// clearToAdd (participation)
			// clearToAdd (item)
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
