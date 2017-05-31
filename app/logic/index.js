import createEvents from './events'
import subscribe from './handlers'

let initLogic = store => {
	let events = createEvents();
	subscribe(events, store);

	return events;
};

export default initLogic;
