import * as Rx from 'rx'
import initEventStreams from './events'
import subscribe from './handlers'

let initEvents = store => {
	let { eventStreams, eventDispatchers } = initEventStreams();
	subscribe(eventStreams, eventDispatchers, store);

	return eventDispatchers;
};

export default initEvents;
