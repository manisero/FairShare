let subscribe = (eventStreams, eventDispatchers, store) => {

	eventStreams.inputChanged
		.subscribe(e => {
			store.actions.changeInput(e.value);
		});

	eventStreams.inputChanged
		.debounce(500)
		.subscribe(e => store.actions.changeInputLength(e.value.length));

};

export default subscribe;
