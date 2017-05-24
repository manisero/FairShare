let subscribe = (eventStreams, eventDispatchers, store) => {

	eventStreams.inputChanged
		.subscribe(e => store.actions.changeInput(e.value, e));

	eventStreams.inputChanged
		.debounceTime(500)
		.subscribe(e => store.actions.changeInputLength(e.value.length, e));

};

export default subscribe;
