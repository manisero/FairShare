import initEvents from './events'
import subscribe from './handlers'

let initLogic = store => {
	let events = initEvents();
	subscribe(events, store);

	return events;
};

export default initLogic;
