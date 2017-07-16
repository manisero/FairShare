import { EntityType, FocusMode } from 'model'
import { actions } from 'actions'

let subscribeSelecting = (events, store) => {

    events.participantSelected.stream
		.subscribe(e => store.dispatch(
            actions.setFocus(EntityType.participant, FocusMode.selected, e.data.participantId, e)
        ));
    
    events.participantDeselected.stream
		.subscribe(e => store.dispatch(
            actions.clearFocus(EntityType.participant, e)
        ));

};

export default subscribeSelecting;
