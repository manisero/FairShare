import { createActions } from 'framework/store'
import stateOperations from './stateOperations'

let actions = createActions({
    selectParticipant: participantId => ({ participantId }),
    updateParticipant: (participantId, updateCommand) => ({ participantId, updateCommand }),
    selectItem: itemId => ({ itemId }),
    updateItem: (itemId, updateCommand) => ({ itemId, updateCommand })
});

let reducer = (state, action) => {
    switch (action.type) {

    case actions.selectParticipant.type:
        return stateOperations.selectParticipant(action.data.participantId, state);

    case actions.updateParticipant.type:
        return stateOperations.updateParticipant(action.data.participantId, action.data.updateCommand, state);

    case actions.selectItem.type:
        return stateOperations.selectItem(action.data.itemId, state);
    
    case actions.updateItem.type:
        return stateOperations.updateItem(action.data.itemId, action.data.updateCommand, state);

    default:
        return state;
    }
};

export { actions, reducer };
