import Rx from 'rxjs/Rx'

let subscribe = (events, store) => {

	events.participantEdited.stream
		.subscribe(e => store.actions.updateParticipant(e.data.participantId, e.data.name, e.data.contribution, e));

};

export default subscribe;
