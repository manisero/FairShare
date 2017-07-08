import { EntityCategory } from 'model'

let setFocus = (itemId, mode) => ({
    itemId: { $set: itemId },
    mode: { $set: mode }
});

export default {

    // entities:

    addEntity: (entity, id, data) =>
        ({ [EntityCategory[entity]]: { [entity]: {
            lastId: { $set: id },
            ids: { $push: [id] },
            items: { [id]: { $set: data } }
        } } }),
    
    updateEntity: (entity, id, data) =>
        ({ [EntityCategory[entity]]: { [entity]: { items: { [id]: { $set: data } } } } }),

    deleteEntity: (entity, id, state) => {
        let idIndex = state[EntityCategory[entity]][entity].ids.indexOf(id);

        return { [EntityCategory[entity]]: { [entity]: {
            ids: { $splice: [[ idIndex, 1 ]] },
            items: { $unset: [id] }
        } } };
    },

    deleteAllEntities: entity => 
        ({ [EntityCategory[entity]]: { [entity]: {
            ids: { $set: [] },
            items: { $set: {} }
        } } }),

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
        ({ ui: { [entity]: { edit: { $unset: [id] } } } }),

    setEditError: (entity, id, error) =>
        ({ ui: { [entity]: { edit: { [id]: { error: { $set: error } } } } } }),

    clearEditError: (entity, id, error) =>
        ({ ui: { [entity]: { edit: { [id]: { $unset: ['error'] } } } } })

};
