import * as Rx from 'rx'
import createEventStreams from './events'

let initEventStreams = store => {
	let eventStreams = createEventStreams();

	eventStreams.inputChanged.stream
		.subscribe(e => store.actions.changeInput(e.value));

	eventStreams.inputChanged.stream
		.debounce(500)
		.subscribe(e => store.actions.changeInputLength(e.value.length));

	return eventStreams;
};

export default initEventStreams;
