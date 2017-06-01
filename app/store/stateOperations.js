import update from 'immutability-helper'

let stateOperations = {

    selectParticipant: (participantId, state) =>
        update(state, { ui: {
            selectedParticipantId: { $set: participantId },
            selectedItemId: { $set: null }
        } }),

    updateParticipant: (participantId, updateCommand, state) =>
        update(state, { data: { participants: { items: { [participantId]: updateCommand } } } })

};

export default stateOperations;
