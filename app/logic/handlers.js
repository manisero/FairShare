import Rx from 'rxjs/Rx'

let subscribe = (events, store) => {

	events.inputAdded.stream
		.subscribe(e => store.actions.addInput(e));

	events.inputChanged.stream
		.subscribe(e => store.actions.changeInput(e.inputId, e.value, e));

	events.inputChanged.stream
		.debounceTime(500) // TODO: This doesn't work when user quickly changes two inputs (only last one's info gets updated)
		.subscribe(e => store.actions.updateInputInfo(e.inputId, e));
	
	Rx.Observable.merge(events.inputAdded.stream, events.inputChanged.stream)
		.debounceTime(700)
		.subscribe(e => store.actions.updateGlobalInfo(e));

};

export default subscribe;
