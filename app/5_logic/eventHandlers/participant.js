import update from 'immutability-helper'
import { copyDeep, ifNull } from 'jsUtils'
import { EntityType, entityConstructors, FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'
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

            let { data, error } = queries.edit(state, EntityType.participant, participantId);

            if (error != null) {
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
			let updateParticipationsActions = [];

			let participations = queries.entityAllData(state, EntityType.participation);

			Object.keys(participations).forEach(itemId => {
				let participation = participations[itemId];
				
				if (participantId in participation) {
					let newParticipation = Object.assign({}, participation);
					delete newParticipation[participantId];

					updateParticipationsActions.push(actions.updateEntity(EntityType.participation, itemId, newParticipation));
				}
			});

			// TODO: Delete corresponding Participation edits
			store.dispatchBatch([
				actions.deleteEntity(EntityType.participant, participantId, e),
				actions.clearFocus(EntityType.participant, e),
				actions.clearEdit(EntityType.participant, participantId, e)
			].concat(updateParticipationsActions));
		});

	events.participantDelete_Cancelled.stream
		.subscribe(e => store.dispatch(
            actions.clearFocus(EntityType.participant, e)
        ));

};

export default subscribe;
