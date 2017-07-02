// Helpers:

let setFocus = (itemId, mode) => ({
    itemId: { $set: itemId },
    mode: { $set: mode }
});

// Commands:

let stateCommands = {

    // data:

    addEntity: (entity, id, data) =>
        ({ data: { [entity]: {
            lastId: { $set: id },
            ids: { $push: [id] },
            items: { [id]: { $set: data } }
        } } }),
    
    updateEntity: (entity, id, data) =>
        ({ data: { [entity]: { items: { [id]: { $set: data } } } } }),

    deleteEntity: (entity, id, state) => {
        let idIndex = state.data[entity].ids.indexOf(id);

        return { data: { [entity]: {
            ids: { $splice: [[ idIndex, 1 ]] },
            items: { $unset: [id] }
        } } };
    },

    // ui:

    setFocus: (entity, id, mode) =>
        ({ ui: { [entity]: { focus: setFocus(id, mode) } } }),
    
    clearFocus: entity =>
        ({ ui: { [entity]: { focus: setFocus(null, null) } } }),

    setEdit: (entity, id, data, state) => {
        if (state.ui[entity].edit[id] == null) {
            return { ui: { [entity]: { edit: { [id]: { $set: { data: data } } } } } };
        } else {
            return { ui: { [entity]: { edit: { [id]: { data: { $set: data } } } } } };
        };
    },
    
    clearEdit: (entity, id) =>
        ({ ui: { [entity]: { edit: { $unset: [id] } } } })
    
};

export default stateCommands;
