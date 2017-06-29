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
    
    deselectEntity: (entity, state) =>
        update(state, { ui: { [entity]: { focus: helpers.setFocus(null, null) } } }),

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
        start: (entity, id, state) =>
            update(state, { ui: { [entity]: { focus: helpers.setFocus(id, FocusMode.deleted) } } }),

        submitFocused: (entity, state) => {
            let id = state.ui[entity].focus.itemId;
            let idIndex = state.data[entity].ids.indexOf(id);

            return update(state, {
                data: { [entity]: {
                    ids: { $splice: [[ idIndex, 1 ]] },
                    items: { $unset: [id] }
                } },
                ui: { [entity]: {
                    focus: helpers.setFocus(null, null),
                    edit: { $unset: [ id ] }
                } }
            });
        },

        cancelFocused: (entity, state) =>
            update(state, { ui: { [entity]: { focus: helpers.setFocus(null, null) } } })
    }
    
};

export default stateOperations;
