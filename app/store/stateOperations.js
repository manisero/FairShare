import update from 'immutability-helper'
import { copyDeep} from 'jsUtils'
import { FocusMode } from 'model'

let stateOperations = {

    // Generic:
    selectEntity: (entity, id, state) =>
        update(state, { ui: { [entity]: { focus: setFocus(id, FocusMode.selected) } } }),
    
    // addEntity: (entity, id, data, state) =>
    // entityEditStart: (entity, id, state) =>
    // entitySelectedEditUpdate: (entity, updateCommand) =>
    // entitySelectedEditSubmit: (entity, state) =>
    // entitySelectedEditCancel: (entity, state) =>
    // entitySelectedDeleteStart: (entity, state) =>
    // entitySelectedDeleteSubmit: (entity, state) =>
    // entitySelectedDeleteCancel: (entity, state) =>

    // Helpers:
    setFocus: (itemId, mode) => ({
        itemId: { $set: itemId },
        mode: { $set: mode }
    }),

    // Participant:
    selectParticipant: (participantId, state) =>
        update(state, { ui: { participant: { focus: {
            itemId: { $set: participantId },
            mode: { $set: FocusMode.selected }
        } } } }),
    
    addParticipant: (participantId, state) =>
        update(state, { data: { participant: {
            lastId: { $set: participantId },
            ids: { $push: [participantId] },
            items: { [participantId]: { $set: {
                name: '',
                contribution: 0
            } } }
        } } }),
    
    startEditingParticipant: (participantId, state) => {
        let command = { ui: { participant: { focus: {
            itemId: { $set: participantId },
            mode: { $set: FocusMode.edited }
        } } } };
        
        if (state.ui.participant.edit[participantId] == null) {
            let participant = copyDeep(state.data.participant.items[participantId]);

            command.ui.participant.edit = {
                [participantId]: { $set: participant}
            };
        }

        return update(state, command);
    },
    
    editParticipant: (participantId, updateCommand, state) =>
        update(state, { ui: { participant: { edit: { [participantId]: updateCommand } } } }),
    
    submitEditingParticipant: state => {
        let participantId = state.ui.participant.focus.itemId;
        let participant = state.ui.participant.edit[participantId];

        return update(state, {
            data: { participant: { items: { [participantId]: { $set: participant } } } },
            ui: { participant: {
                focus: {
                    itemId: { $set: null },
                    mode: { $set: null }
                },
                edit: { $unset: [ participantId ] }
            } }
        });
    },

    cancelEditingParticipant: state => {
        let participantId = state.ui.participant.focus.itemId;

        return update(state, { ui: { participant: {
            focus: {
                itemId: { $set: null },
                mode: { $set: null }
            },
            edit: { $unset: [ participantId ] }
        } } });
    },

    startDeletingParticipant: (participantId, state) =>
        update(state, { ui: { participant: { focus: {
            itemId: { $set: participantId },
            mode: { $set: FocusMode.deleted }
        } } } }),
    
    submitDeletingParticipant: state => {
        let participantId = state.ui.participant.focus.itemId;
        let idIndex = state.data.participant.ids.indexOf(participantId);

        return update(state, {
            data: { participant: {
                ids: { $splice: [[ idIndex, 1 ]] },
                items: { $unset: [participantId] }
            } },
            ui: { participant: {
                focus: {
                    itemId: { $set: null },
                    mode: { $set: null }
                },
                edit: { $unset: [ participantId ] }
            } }
        });
    },
    
    cancelDeletingParticipant: state => {
        let participantId = state.ui.participant.focus.itemId;

        return update(state, { ui: { participant: { focus: {
            itemId: { $set: null },
            mode: { $set: null }
        } } } });
    },

    // Item:
    selectItem: (itemId, state) =>
        update(state, { ui: { selectedItemId: { $set: itemId } } }),
    
    addItem: (itemId, state) =>
        update(state, { data: { item: {
            lastId: { $set: itemId },
            ids: { $push: [itemId] },
            items: { [itemId]: { $set: {
                name: '',
                price: 0
            } } }
        } } }),
    
    updateItem: (itemId, updateCommand, state) =>
        update(state, { data: { item: { items: { [itemId]: updateCommand } } } }),
};

export default stateOperations;
