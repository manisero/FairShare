let subscribe = (events, store) => {

	events.inputChanged.stream
		.subscribe(e => store.actions.changeInput(e.value, e));

	events.inputChanged.stream
		.debounceTime(500)
		.subscribe(e => store.actions.changeInputLength(e.value.length, e));

};

export default subscribe;
