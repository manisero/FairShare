let eventDataCreators = ({
    participantSelected: participantId => ({ participantId }),
	participantAdded: () => ({}),
    participantEdited: (participantId, updateCommand) => ({ participantId, updateCommand }),
	itemSelected: itemId => ({ itemId }),
	itemAdded: itemId => ({ itemId }),
	itemEdited: (itemId, updateCommand) => ({ itemId, updateCommand })
});

let subscribe = (events, store) => {

	events.participantSelected.stream
		.subscribe(e => store.actions.selectParticipant(e.data.participantId, e));

	events.participantAdded.stream
		.subscribe(e => store.actions.addParticipant(store.getState().data.participants.lastId + 1, e));

	events.participantEdited.stream
		.subscribe(e => store.actions.updateParticipant(e.data.participantId, e.data.updateCommand, e));
	
	events.itemSelected.stream
		.subscribe(e => store.actions.selectItem(e.data.itemId, e));
	
	events.itemAdded.stream
		.subscribe(e => store.actions.addItem(store.getState().data.items.lastId + 1, e));

	events.itemEdited.stream
		.subscribe(e => store.actions.updateItem(e.data.itemId, e.data.updateCommand, e));

};

export { eventDataCreators, subscribe };
