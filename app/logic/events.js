import { EntityType } from 'model'

let eventDataCreators = ({
	// Participant:
    participantSelected: participantId => ({ participantId }),
	participantDeselected: () => ({}),
	participantAdded: () => ({}),
	participantEditStarted: participantId => ({ participantId }),
	participantEditUpdated: (participantId, updateCommand) => ({ participantId, updateCommand }),
	participantEditSubmitted: participantId => ({ participantId }),
	participantEditCancelled: participantId => ({ participantId }),
	participantDeleteStarted: participantId => ({ participantId }),
	participantDeleteSubmitted: participantId => ({ participantId }),
	participantDeleteCancelled: participantId => ({ participantId }),
	// Item:
	itemSelected: itemId => ({ itemId }),
	itemAdded: itemId => ({ itemId }),
	itemEdited: (itemId, updateCommand) => ({ itemId, updateCommand })
});

let subscribe = (events, store) => {

	// Participant:
	events.participantSelected.stream
		.subscribe(e => store.actions.selectEntity(EntityType.participant, e.data.participantId, e));
	
	events.participantDeselected.stream
		.subscribe(e => store.actions.deselectEntity(EntityType.participant, e));

	events.participantAdded.stream
		.subscribe(e => {
			let participantId = store.getState().data.participant.lastId + 1;
			let participant = {
				name: '',
				contribution: 0
			};

			store.actions.addEntity(EntityType.participant, participantId, participant, e);
			store.actions.editEntity_start(EntityType.participant, participantId, e);
		});
	
	events.participantEditStarted.stream
		.subscribe(e => store.actions.editEntity_start(EntityType.participant, e.data.participantId, e));
	
	events.participantEditUpdated.stream
		.subscribe(e => store.actions.editEntity_updateFocused(EntityType.participant, e.data.updateCommand, e));
	
	events.participantEditSubmitted.stream
		.subscribe(e => store.actions.editEntity_submitFocused(EntityType.participant, e));

	events.participantEditCancelled.stream
		.subscribe(e => store.actions.editEntity_cancelFocused(EntityType.participant, e));
	
	events.participantDeleteStarted.stream
		.subscribe(e => store.actions.deleteEntity_start(EntityType.participant, e.data.participantId, e));
	
	events.participantDeleteSubmitted.stream
		.subscribe(e => store.actions.deleteEntity_submitFocused(EntityType.participant, e));

	events.participantDeleteCancelled.stream
		.subscribe(e => store.actions.deleteEntity_cancelFocused(EntityType.participant, e));

	// Item:
	events.itemSelected.stream
		.subscribe(e => store.actions.selectItem(e.data.itemId, e));
	
	events.itemAdded.stream
		.subscribe(e => store.actions.addItem(store.getState().data.item.lastId + 1, e));

	events.itemEdited.stream
		.subscribe(e => store.actions.updateItem(e.data.itemId, e.data.updateCommand, e));

};

export { eventDataCreators, subscribe };
