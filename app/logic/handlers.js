import Rx from 'rxjs/Rx'

let subscribe = (events, store) => {

	events.participantSelected.stream
		.subscribe(e => store.actions.selectParticipant(e.data.participantId, e));

	events.participantEdited.stream
		.subscribe(e => store.actions.updateParticipant(e.data.participantId, e.data.name, e.data.contribution, e));

};

export default subscribe;
