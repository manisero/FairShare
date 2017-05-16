import * as Rx from 'rx'
import initEventStreams from './events'

let initEvents = store => {
	let { eventStreams, eventDispatchers } = initEventStreams();

	eventStreams.inputChanged
		.subscribe(e => {
			store.actions.changeInput(e.value);
		});

	eventStreams.inputChanged
		.debounce(500)
		.subscribe(e => store.actions.changeInputLength(e.value.length));

	return eventDispatchers;
};

export default initEvents;
