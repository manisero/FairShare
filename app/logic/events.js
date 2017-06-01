let eventDataCreators = ({
    participantSelected: participantId => ({ participantId }),
    participantEdited: (participantId, updateCommand) => ({ participantId, updateCommand }),
	itemSelected: itemId => ({ itemId }),
	itemEdited: (itemId, updateCommand) => ({ itemId, updateCommand })
});

let subscribe = (events, store) => {

	events.participantSelected.stream
		.subscribe(e => store.actions.selectParticipant(e.data.participantId, e));

	events.participantEdited.stream
		.subscribe(e => store.actions.updateParticipant(e.data.participantId, e.data.updateCommand, e));
	
	events.itemSelected.stream
		.subscribe(e => store.actions.selectItem(e.data.itemId, e));
	
	events.itemEdited.stream
		.subscribe(e => store.actions.updateItem(e.data.itemId, e.data.updateCommand, e));

};

export { eventDataCreators, subscribe };
