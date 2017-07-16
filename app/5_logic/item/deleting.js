import { EntityType, FocusMode } from 'model'
import { actions } from 'actions'

let subscribeDeleting = (events, store) => {

    events.itemDelete_Started.stream
		.subscribe(e => store.dispatch(
            actions.setFocus(EntityType.item, FocusMode.deleted, e.data.itemId, e)
        ));
    
    events.itemDelete_Submitted.stream
		.subscribe(e => {
			let itemId = e.data.itemId;

			store.dispatchBatch([
				actions.deleteEntity(EntityType.participation, itemId, e),
				actions.deleteEntity(EntityType.item, itemId, e),
				actions.clearFocus(EntityType.item, e),
				actions.clearEdit(EntityType.participation, itemId, e),
				actions.clearEdit(EntityType.item, itemId, e)
			], e);
		});

	events.itemDelete_Cancelled.stream
		.subscribe(e => store.dispatch(
            actions.clearFocus(EntityType.item, e)
        ));

};

export default subscribeDeleting;
