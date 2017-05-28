import Rx from 'rxjs/Rx'

let subscribe = (events, store) => {

	events.inputAdded.stream
		.subscribe(e => store.actions.addInput(e));

	events.inputChanged.stream
		.subscribe(e => store.actions.changeInput(e.inputId, e.value, e));

	events.inputChanged.stream
		.groupBy(e => e.inputId)
		.subscribe(group => group
			.debounceTime(500)
			.subscribe(e => store.actions.updateInputInfo(e.inputId, e)));

	Rx.Observable.merge(events.inputAdded.stream, events.inputChanged.stream)
		.debounceTime(700)
		.subscribe(e => store.actions.updateGlobalInfo(e));

};

export default subscribe;
