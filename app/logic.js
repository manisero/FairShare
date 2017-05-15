import * as Rx from 'rx'

let initLogic = store => {
	let inputChangeStream = new Rx.Subject();

	inputChangeStream.subscribe(value => store.events.inputChanged(value));

	inputChangeStream
		.debounce(500)
		.subscribe(value => store.events.inputLengthChanged(value.length));

	return {
		changeInput: value => inputChangeStream.onNext(value)
	};
};

export default initLogic;
