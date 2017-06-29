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
	itemDeselected: () => ({}),
	itemAdded: () => ({}),
	itemEditStarted: itemId => ({ itemId }),
	itemEditUpdated: (itemId, updateCommand) => ({ itemId, updateCommand }),
	itemEditSubmitted: itemId => ({ itemId }),
	itemEditCancelled: itemId => ({ itemId }),
	itemDeleteStarted: itemId => ({ itemId }),
	itemDeleteSubmitted: itemId => ({ itemId }),
	itemDeleteCancelled: itemId => ({ itemId })
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
		.subscribe(e => store.actions.selectEntity(EntityType.item, e.data.itemId, e));
	
	events.itemDeselected.stream
		.subscribe(e => store.actions.deselectEntity(EntityType.item, e));

	events.itemAdded.stream
		.subscribe(e => {
			let itemId = store.getState().data.item.lastId + 1;
			let item = {
				name: '',
				price: 0
			};

			store.actions.addEntity(EntityType.item, itemId, item, e);
			store.actions.editEntity_start(EntityType.item, itemId, e);
		});
	
	events.itemEditStarted.stream
		.subscribe(e => store.actions.editEntity_start(EntityType.item, e.data.itemId, e));
	
	events.itemEditUpdated.stream
		.subscribe(e => store.actions.editEntity_updateFocused(EntityType.item, e.data.updateCommand, e));
	
	events.itemEditSubmitted.stream
		.subscribe(e => store.actions.editEntity_submitFocused(EntityType.item, e));

	events.itemEditCancelled.stream
		.subscribe(e => store.actions.editEntity_cancelFocused(EntityType.item, e));
	
	events.itemDeleteStarted.stream
		.subscribe(e => store.actions.deleteEntity_start(EntityType.item, e.data.itemId, e));
	
	events.itemDeleteSubmitted.stream
		.subscribe(e => store.actions.deleteEntity_submitFocused(EntityType.item, e));

	events.itemDeleteCancelled.stream
		.subscribe(e => store.actions.deleteEntity_cancelFocused(EntityType.item, e));

};

export { eventDataCreators, subscribe };
