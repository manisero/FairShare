import update from 'immutability-helper';
import { actions } from './actions'

let selectParticipant = (participantId, state) =>
    update(state, { ui: {
        selectedParticipantId: { $set: participantId },
        selectedItemId: { $set: null }
    } });

let updateParticipant = (participantId, participantData, state) =>
    update(state, { data: { participants: { items: { [participantId]: {
        name: { $set: participantData.name },
        contribution: { $set: participantData.contribution }
    } } } } });

export default (state, action) => {
    switch (action.type) {

    case actions.selectParticipant.type:
        return selectParticipant(action.data.participantId, state);

    case actions.updateParticipant.type:
        return updateParticipant(action.data.participantId, action.data, state);

    default:
        return state;
    }
};
