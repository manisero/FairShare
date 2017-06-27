import update from 'immutability-helper'
import { FocusMode } from 'model'

let stateOperations = {

    selectParticipant: (participantId, state) =>
        update(state, { ui: { participantFocus: {
            itemId: { $set: participantId },
            mode: { $set: FocusMode.selected }
        } } }),
    
    startEditingParticipant: (participantId, state) =>
        update(state, { ui: { participantFocus: {
            itemId: { $set: participantId },
            mode: { $set: FocusMode.edited }
        } } }),
    
    cancelEditingParticipant: state =>
        update(state, { ui: { participantFocus: {
            itemId: { $set: null },
            mode: { $set: null }
        } } }),

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
        update(state, { ui: { selectedItemId: { $set: itemId } } }),
    
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
