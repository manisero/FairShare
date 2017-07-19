import { copyDeep } from 'jsUtils'
import { EntityType, FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'
import validators from 'validators'
import { handleEntityEditUpdated } from '../shared'

let subscribeEditing = (events, store) => {

	events.participantEdit_Started.stream
		.subscribe(e => {
			let state = store.getState();
			let participantId = e.data.participantId;
            let actionsBatch = [];

            if (queries.edit(state, EntityType.participant, participantId) == null) {
                let participantEdit = copyDeep(queries.entityData(state, EntityType.participant, participantId));

				actionsBatch.push(actions.setEdit(EntityType.participant, participantId, participantEdit, e));
            }

            actionsBatch.push(actions.setFocus(EntityType.participant, FocusMode.edited, participantId, e));

            store.dispatchBatch(actionsBatch, e);
		});
    
    events.participantEdit_Updated.stream
		.subscribe(e => store.dispatchBatch(
            handleEntityEditUpdated(store.getState(), EntityType.participant, e.data.participantId, e.data.updateCommand, e),
			e
        ));
	
	events.participantEdit_Submitted.stream
		.subscribe(e => {
			let state = store.getState();
			let participantId = e.data.participantId;
            let data = queries.edit(state, EntityType.participant, participantId).data;

			let error = validators.participant.edit(participantId, data, state);

            if (error != null) {
                store.dispatch(
					actions.setEditError(EntityType.participant, participantId, error, e)
				);

				return;
			}

			let participant =  { name: data.name, contribution: data.contribution };

			store.dispatchBatch([
                actions.updateEntity(EntityType.participant, participantId, participant, e),
                actions.clearFocus(EntityType.participant, e),
                actions.clearEdit(EntityType.participant, participantId, e)
			], e);

			events.settlementRequested();
		});
	
	events.participantEdit_Cancelled.stream
		.subscribe(e => store.dispatchBatch([
            actions.clearFocus(EntityType.participant, e),
		    actions.clearEdit(EntityType.participant, e.data.participantId, e)
		], e));

};

export default subscribeEditing;
