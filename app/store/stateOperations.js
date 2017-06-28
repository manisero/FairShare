import update from 'immutability-helper'
import { copyDeep} from 'jsUtils'
import { FocusMode } from 'model'

// Helpers:

let helpers = {
    setFocus: (itemId, mode) => ({
        itemId: { $set: itemId },
        mode: { $set: mode }
    })
};

let stateOperations = {

    selectEntity: (entity, id, state) =>
        update(state, { ui: { [entity]: { focus: helpers.setFocus(id, FocusMode.selected) } } }),
    
    addEntity: (entity, id, data, state) =>
        update(state, { data: { [entity]: {
            lastId: { $set: id },
            ids: { $push: [id] },
            items: { [id]: { $set: data } }
        } } }),
    
    editEntity: {
        start: (entity, id, state) => {
            let command = { ui: { [entity]: { focus: helpers.setFocus(id, FocusMode.edited) } } };
            
            if (state.ui[entity].edit[id] == null) {
                let item = copyDeep(state.data[entity].items[id]);

                command.ui[entity].edit = { [id]: { $set: item} };
            }

            return update(state, command);
        },

        updateFocused: (entity, updateCommand, state) => {
            let id = state.ui[entity].focus.itemId;

            return update(state, { ui: { [entity]: { edit: { [id]: updateCommand } } } });
        },

        submitFocused: (entity, state) => {
            let id = state.ui[entity].focus.itemId;
            let item = state.ui[entity].edit[id];

            return update(state, {
                data: { [entity]: { items: { [id]: { $set: item } } } },
                ui: { [entity]: {
                    focus: helpers.setFocus(null, null),
                    edit: { $unset: [ id ] }
                } }
            });
        },

        cancelFocused: (entity, state) => {
            let id = state.ui[entity].focus.itemId;

            return update(state, { ui: { [entity]: {
                focus: helpers.setFocus(null, null),
                edit: { $unset: [ id ] }
            } } });
        }
    },

    deleteEntity: {
        // start: (entity, id, state) =>
        // submitFocused: (entity, state) =>
        // cancelFocused: (entity, state) =>
    },

    // Participant:
    
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
