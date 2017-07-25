import { EntityType } from 'model'
import { actions } from 'actions'
import queries from 'queries'
import validators from 'validators'
import { handleEntityAddNextUpdated, handleEntityEditUpdated } from '../shared'

let subscribe = (events, store) => {
	
    events.participationEditModeChanged.stream
        .subscribe(e => {
            store.dispatch(actions.setParticipationEditMode(e.data.mode, e));

            events.participationsValidationRequested();
        });

    events.participationAddValidationRequested.stream
        .subscribe(e => store.dispatchBatch(
            handleEntityAddNextUpdated(store.getState(), EntityType.participation, null, e),
            e
        ));
    
    events.participationEditValidationRequested.stream
        .subscribe(e => store.dispatchBatch(
            handleEntityEditUpdated(store.getState(), EntityType.participation, e.data.itemId, null, e),
            e
        ));

    events.participationsValidationRequested.stream
        .subscribe(e => store.dispatchBatch(
            handleAllParticiaptionsValidation(store.getState(), e),
            e
        ));

    events.participationAdd_Updated.stream
        .subscribe(e => store.dispatchBatch(
            handleEntityAddNextUpdated(store.getState(), EntityType.participation, e.data.updateCommand, e),
            e
        ));
    
    events.participationEdit_Updated.stream
        .subscribe(e => store.dispatchBatch(
            handleEntityEditUpdated(store.getState(), EntityType.participation, e.data.itemId, e.data.updateCommand, e),
            e
        ));

};

let handleAllParticiaptionsValidation = (state, origin) => {
    let actions = [];

    let addActions = handleEntityAddNextUpdated(state, EntityType.participation, null, origin);
    actions.push(...addActions);

    for (var id of queries.allEditIds(state, EntityType.participation)) {
        let editActions = handleEntityEditUpdated(state, EntityType.participation, id, null, origin);
        actions.push(...editActions);
    }

    return actions;
};

export default subscribe;
