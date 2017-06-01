let eventDataCreators = ({
    participantSelected: participantId => ({ participantId }),
    participantNameEdited: (participantId, name) => ({ participantId, name })
});

let subscribe = (events, store) => {

	events.participantSelected.stream
		.subscribe(e => store.actions.selectParticipant(e.data.participantId, e));

	events.participantNameEdited.stream
		.subscribe(e => store.actions.updateParticipantName(e.data.participantId, e.data.name, e));

};

export { eventDataCreators, subscribe };
