import { copyDeep, mapToObject } from 'jsUtils'
import { EntityType, entityConstructors, FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'
import { getNextEntityId } from '../shared'

let subscribeAdding = (events, store) => {

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
