import subscribeSelecting from './selecting'
import subscribeAdding from './adding'
import subscribeEditing from './editing'
import subscribeDeleting from './deleting'

let subscribe = (events, store) => {
	subscribeSelecting(events, store);
	subscribeAdding(events, store);
	subscribeEditing(events, store);
	subscribeDeleting(events, store);
};

export default subscribe;
