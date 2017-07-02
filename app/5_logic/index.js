import { createEvents } from 'framework/logic'
import { eventDataCreators, subscribe } from './events'

let initLogic = store => {
	let events = createEvents(eventDataCreators);
	subscribe(events, store);

	return events;
};

export default initLogic;
