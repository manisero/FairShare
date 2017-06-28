import { EntityType } from 'model'

let eventDataCreators = ({
	// Participant:
    participantSelected: participantId => ({ participantId }),
	participantAdded: () => ({}),
	participantEditingStarted: participantId => ({ participantId }),
	participantEdited: (participantId, updateCommand) => ({ participantId, updateCommand }),
	participantEditingSubmitted: participantId => ({ participantId }),
	participantEditingCancelled: participantId => ({ participantId }),
	participantDeletingStarted: participantId => ({ participantId }),
	participantDeletingSubmitted: participantId => ({ participantId }),
	participantDeletingCancelled: participantId => ({ participantId }),
	// Item:
	itemSelected: itemId => ({ itemId }),
	itemAdded: itemId => ({ itemId }),
	itemEdited: (itemId, updateCommand) => ({ itemId, updateCommand })
});

let subscribe = (events, store) => {

	// Participant:
	events.participantSelected.stream
		.subscribe(e => store.actions.selectEntity(EntityType.participant, e.data.participantId, e));

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
	
	events.participantEditingStarted.stream
		.subscribe(e => store.actions.editEntity_start(EntityType.participant, e.data.participantId, e));
	
	events.participantEdited.stream
		.subscribe(e => store.actions.editEntity_updateFocused(EntityType.participant, e.data.updateCommand, e));
	
	events.participantEditingSubmitted.stream
		.subscribe(e => store.actions.editEntity_submitFocused(EntityType.participant, e));

	events.participantEditingCancelled.stream
		.subscribe(e => store.actions.editEntity_cancelFocused(EntityType.participant, e));
	
	events.participantDeletingStarted.stream
		.subscribe(e => store.actions.deleteEntity_start(EntityType.participant, e.data.participantId, e));
	
	events.participantDeletingSubmitted.stream
		.subscribe(e => store.actions.deleteEntity_submitFocused(EntityType.participant, e));

	events.participantDeletingCancelled.stream
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
