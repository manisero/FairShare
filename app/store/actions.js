import { createActions } from 'framework/store'
import stateOperations from './stateOperations'

let actions = createActions({
    selectParticipant: participantId => ({ participantId }),
    startEditingParticipant: participantId => ({ participantId }),
    cancelEditingParticipant: participantId => ({ participantId }),
    addParticipant: participantId => ({ participantId }),
    updateParticipant: (participantId, updateCommand) => ({ participantId, updateCommand }),
    selectItem: itemId => ({ itemId }),
    addItem: itemId => ({ itemId }),
    updateItem: (itemId, updateCommand) => ({ itemId, updateCommand })
});

let reducer = (state, action) => {
    switch (action.type) {

    case actions.selectParticipant.type:
        return stateOperations.selectParticipant(action.data.participantId, state);
    
    case actions.startEditingParticipant.type:
        return stateOperations.startEditingParticipant(action.data.participantId, state);
    
    case actions.cancelEditingParticipant.type:
        return stateOperations.cancelEditingParticipant(state);

    case actions.addParticipant.type:
        return stateOperations.addParticipant(action.data.participantId, state);

    case actions.updateParticipant.type:
        return stateOperations.updateParticipant(action.data.participantId, action.data.updateCommand, state);

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
