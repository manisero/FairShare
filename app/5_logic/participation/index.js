import { EntityType } from 'model'
import { actions } from 'actions'
import { handleEntityAddNextUpdated, handleEntityEditUpdated } from '../shared'

let subscribe = (events, store) => {
	
    events.participationEditModeChanged.stream
		.subscribe(e => store.dispatch(
            actions.setParticipationEditMode(e.data.mode, e)
        ));

	events.participationAdd_Updated.stream
		.subscribe(e => store.dispatchBatch(
			handleEntityAddNextUpdated(store.getState(), EntityType.participation, e.data.updateCommand, e),
			e)
		);
    
    events.participationEdit_Updated.stream
		.subscribe(e => store.dispatchBatch(
            handleEntityEditUpdated(store.getState(), EntityType.participation, e.data.itemId, e.data.updateCommand, e),
			e
        ));

};

export default subscribe;
