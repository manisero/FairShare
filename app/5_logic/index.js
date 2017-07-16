import { createEvents } from 'framework/logic'
import eventsDataFieldNames from './events'
import subscribe from './eventHandlers/index.js'

let initLogic = store => {
	let events = createEvents(eventsDataFieldNames);
	subscribe(events, store);

	return events;
};

export default initLogic;
