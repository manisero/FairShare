import update from 'immutability-helper';
import { actions } from './actions'

let selectParticipant = (participantId, state) =>
    update(state, { ui: {
        selectedParticipantId: { $set: participantId },
        selectedItemId: { $set: null }
    } });

let updateParticipant = (participantId, updateCommand, state) =>
    update(state, { data: { participants: { items: { [participantId]: updateCommand } } } });

export default (state, action) => {
    switch (action.type) {

    case actions.selectParticipant.type:
        return selectParticipant(action.data.participantId, state);

    case actions.updateParticipantName.type:
        return updateParticipant(action.data.participantId, { name: { $set: action.data.name } }, state);

    default:
        return state;
    }
};
