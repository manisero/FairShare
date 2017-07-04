import { copyDeep, ifNull, mapToObject } from 'jsUtils'
import { EntityType, entityConstructors, FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'
import { getNextEntityId, actionBatches } from './helpers'

let createParticipationEdit = (state, itemId) => {
	let participantIds = queries.entityIds(state, EntityType.participant);
	let itemParticipations = ifNull(queries.entityData(state, EntityType.participation, itemId), () => ({}));

	return mapToObject(
		participantIds,
		id => ifNull(itemParticipations[id], () => entityConstructors.participation())
	);
};

let subscribe = (events, store) => {

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

			// TODO: Note that new Participants won't be added to existing edit
			if (queries.edit(state, EntityType.participation, itemId) == null) {
				let participationEdit = createParticipationEdit(state, itemId);

				store.dispatch(actions.setEdit(EntityType.participation, itemId, participationEdit, e));
            }

			// TODO: Refactor to call one dispatch only
			events.entityEdit_Started(EntityType.item, itemId);
		});
	
	events.itemEdit_Submitted.stream
		.subscribe(e => {
			let state = store.getState();
			let itemId = e.data.itemId;

			// TODO: Prevent submit in case of validation errors
			store.dispatchBatches([
				actionBatches.entityEdit_Submitted(state, EntityType.participation, itemId, e), // TODO: Filter out participations without 'contribution' nor 'participates'
				actionBatches.entityEdit_Submitted(state, EntityType.item, itemId, e)
			]);
		});
	
	events.itemEdit_Cancelled.stream
		.subscribe(e => store.dispatchBatches([
			actionBatches.entityEdit_Cancelled(EntityType.participation, e),
			actionBatches.entityEdit_Cancelled(EntityType.item, e)
		]));

};

export default subscribe;
