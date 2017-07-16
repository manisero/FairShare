import { EntityType, FocusMode, } from 'model'
import { actions } from 'actions'

let subscribeSelecting = (events, store) => {

    events.itemSelected.stream
		.subscribe(e => store.dispatch(
            actions.setFocus(EntityType.item, FocusMode.selected, e.data.itemId, e)
        ));
    
    events.itemDeselected.stream
		.subscribe(e => store.dispatch(
            actions.clearFocus(EntityType.item, e)
        ));

};

export default subscribeSelecting;
