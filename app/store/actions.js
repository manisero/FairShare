import { createActions } from 'framework/store'
import stateOperations from './stateOperations'

let actions = createActions({
    selectParticipant: participantId => ({ participantId }),
    updateParticipantName: (participantId, name) => ({ participantId, name })
});

let reducer = (state, action) => {
    switch (action.type) {

    case actions.selectParticipant.type:
        return stateOperations.selectParticipant(action.data.participantId, state);

    case actions.updateParticipantName.type:
        return stateOperations.updateParticipant(action.data.participantId, { name: { $set: action.data.name } }, state);

    default:
        return state;
    }
};

export { actions, reducer };
