import update from 'immutability-helper'

let stateOperations = {

    selectParticipant: (participantId, state) =>
        update(state, { ui: {
            selectedParticipantId: { $set: participantId },
            selectedItemId: { $set: null }
        } }),

    addParticipant: (participantId, state) =>
        update(state, { data: { participants: {
            lastId: { $set: participantId },
            ids: { $push: [participantId] },
            items: { [participantId]: { $set: {
                participantId: participantId,
                name: '',
                contribution: 0
            } } }
        } } }),

    updateParticipant: (participantId, updateCommand, state) =>
        update(state, { data: { participants: { items: { [participantId]: updateCommand } } } }),

    selectItem: (itemId, state) =>
        update(state, { ui: {
            selectedParticipantId: { $set: null },
            selectedItemId: { $set: itemId }
        } }),
    
    addItem: (itemId, state) =>
        update(state, { data: { items: {
            lastId: { $set: itemId },
            ids: { $push: [itemId] },
            items: { [itemId]: { $set: {
                itemId: itemId,
                name: '',
                price: 0
            } } }
        } } }),
    
    updateItem: (itemId, updateCommand, state) =>
        update(state, { data: { items: { items: { [itemId]: updateCommand } } } }),
};

export default stateOperations;
