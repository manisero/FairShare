import * as Rx from 'rx'

let initLogic = store => {
	let inputChangeStream = new Rx.Subject();

	inputChangeStream.subscribe(value => store.actions.changeInput(value));

	inputChangeStream
		.debounce(500)
		.subscribe(value => store.actions.changeInputLength(value.length));

	return {
		changeInput: value => inputChangeStream.onNext(value)
	};
};

export default initLogic;
