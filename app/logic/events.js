let eventDataCreators = ({
    participantSelected: participantId => ({ participantId }),
    participantEdited: (participantId, updateCommand) => ({ participantId, updateCommand })
});

let subscribe = (events, store) => {

	events.participantSelected.stream
		.subscribe(e => store.actions.selectParticipant(e.data.participantId, e));

	events.participantEdited.stream
		.subscribe(e => store.actions.updateParticipant(e.data.participantId, e.data.updateCommand, e));

};

export { eventDataCreators, subscribe };
