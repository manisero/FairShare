import { createActions } from 'framework/store'
import { EntityType } from 'model'
import stateOperations from './stateOperations'

let actions = createActions({
    // Participant:
    selectParticipant: participantId => ({ participantId }),
    addParticipant: (participantId, data) => ({ participantId, data }),
    startEditingParticipant: participantId => ({ participantId }),
    editParticipant: (participantId, updateCommand) => ({ participantId, updateCommand }),
    submitEditingParticipant: () => ({}),
    cancelEditingParticipant: () => ({}),
    startDeletingParticipant: participantId => ({ participantId }),
    submitDeletingParticipant: () => ({}),
    cancelDeletingParticipant: () => ({}),
    // Item:
    selectItem: itemId => ({ itemId }),
    addItem: itemId => ({ itemId }),
    updateItem: (itemId, updateCommand) => ({ itemId, updateCommand })
});

let reducer = (state, action) => {
    switch (action.type) {

    // Participant:
    case actions.selectParticipant.type:
        return stateOperations.selectEntity(EntityType.participant, action.data.participantId, state);
    
    case actions.addParticipant.type:
        return stateOperations.addEntity(EntityType.participant, action.data.participantId, action.data.data, state);

    case actions.startEditingParticipant.type:
        return stateOperations.editEntity.start(EntityType.participant, action.data.participantId, state);
    
    case actions.editParticipant.type:
        return stateOperations.editEntity.updateFocused(EntityType.participant, action.data.updateCommand, state);
    
    case actions.submitEditingParticipant.type:
        return stateOperations.editEntity.submitFocused(EntityType.participant, state);

    case actions.cancelEditingParticipant.type:
        return stateOperations.editEntity.cancelFocused(EntityType.participant, state);
    
    case actions.startDeletingParticipant.type:
        return stateOperations.startDeletingParticipant(action.data.participantId, state);
    
    case actions.submitDeletingParticipant.type:
        return stateOperations.submitDeletingParticipant(state);

    case actions.cancelDeletingParticipant.type:
        return stateOperations.cancelDeletingParticipant(state);

    // Item:
    case actions.selectItem.type:
        return stateOperations.selectItem(action.data.itemId, state);
    
    case actions.addItem.type:
        return stateOperations.addItem(action.data.itemId, state);
    
    case actions.updateItem.type:
        return stateOperations.updateItem(action.data.itemId, action.data.updateCommand, state);

    default:
        return state;
    }
};

export { actions, reducer };
