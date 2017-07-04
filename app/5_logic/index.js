import { createEvents } from 'framework/logic'
import eventDataCreators from './events'
import subscribe from './eventHandlers/index.js'

let initLogic = store => {
	let events = createEvents(eventDataCreators);
	subscribe(events, store);

	return events;
};

export default initLogic;
