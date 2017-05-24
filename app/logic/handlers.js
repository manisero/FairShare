let subscribe = (events, store) => {

	events.inputChanged.stream
		.subscribe(e => store.actions.changeInput(e.inputId, e.value, e));

	events.inputChanged.stream
		.debounceTime(500)
		.subscribe(e => store.actions.updateInputInfo(e.inputId, e));

};

export default subscribe;
