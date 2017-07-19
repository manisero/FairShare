import update from 'immutability-helper'
import { EntityType, entityConstructors, FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'
import { getNextEntityId } from '../shared'

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

			store.dispatchBatch(actionsBatch, e);
		});

	events.participantsAdd_Added.stream
		.subscribe(e => {
			let toAdd = queries.toAdd_next(store.getState(), EntityType.participant);

			if (toAdd.name == null || toAdd.name == '') {
				return;
			}

			let next = entityConstructors[EntityType.participant]();

			store.dispatchBatch([
				actions.addToAdd(EntityType.participant, toAdd, e),
				actions.setNextToAdd(EntityType.participant, next, e)
			], e);
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
			let ids = [];
			
			let allToAdd = [ ...allAdded, nextToAdd ].filter(x => x.name != null && x.name != '');
			let actionsBatch = [];

			for (let toAdd of allToAdd) {
				let data = entityConstructors.participant(toAdd.name, toAdd.contribution);

				actionsBatch.push(actions.addEntity(EntityType.participant, nextId, data, e));
				ids.push(nextId);
				nextId++;
			}

			actionsBatch.push(actions.clearFocus(EntityType.participant, e));
			actionsBatch.push(actions.clearToAdd(EntityType.participant, e));

			if (queries.participatingParticipantIdsCache(state) != null) {
				actionsBatch.push(actions.addParticipatingParticipantsToCache(ids, e));
			}

			store.dispatchBatch(actionsBatch, e);

			events.settlementRequested();
		});
	
	events.participantsAdd_Cancelled.stream
		.subscribe(e => store.dispatchBatch([
			actions.clearFocus(EntityType.participant, e),
			actions.clearToAdd(EntityType.participant, e)
		], e));

};

export default subscribeAdding;
