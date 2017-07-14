import { EntityCategory } from 'model'

let setFocus = (mode, itemId) => ({
    mode: { $set: mode },
    itemId: { $set: itemId }
});

export default {

    // entities:

    addEntity: (entity, id, data) =>
        ({ [EntityCategory[entity]]: { [entity]: {
            lastId: { $set: id },
            ids: { $push: [ id ] },
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

    setFocus: (entity, mode, id) =>
        ({ ui: { [entity]: { focus: setFocus(mode, id) } } }),
    
    clearFocus: entity =>
        ({ ui: { [entity]: { focus: setFocus(null, null) } } }),

    setNextToAdd: (entity, data) =>
        ({ ui: { [entity]: { toAdd: { next: { $set: data } } } } }),

    addToAdd: (entity, data) =>
        ({ ui: { [entity]: { toAdd: { items: { $push: [ data ] } } } } }),

    updateToAdd: (entity, index, data) =>
        ({ ui: { [entity]: { toAdd: { items: { [index]: { $set: data } } } } } }),

    removeToAdd: (entity, index) =>
        ({ ui: { [entity]: { toAdd: { items: { $splice: [[ index, 1 ]] } } } } }),

    clearToAdd: entity =>
        ({ ui: { [entity]: { toAdd: {
            items: { $set: [] },
            next: { $set: null }
        } } } }),

    setEdit: (entity, id, data, state) => {
        if (state.ui[entity].edit.items[id] == null) {
            return { ui: { [entity]: { edit: { items: { [id]: { $set: { data: data } } } } } } };
        } else {
            return { ui: { [entity]: { edit: { items: { [id]: { data: { $set: data } } } } } } };
        };
    },

    clearEdit: (entity, id) =>
        ({ ui: { [entity]: { edit: { items: { $unset: [id] } } } } }),

    setEditError: (entity, id, error) =>
        ({ ui: { [entity]: { edit: { items: { [id]: { error: { $set: error } } } } } } }),

    clearEditError: (entity, id, error) =>
        ({ ui: { [entity]: { edit: { items: { [id]: { $unset: ['error'] } } } } } }),

    // non-generic:

    setParticipationLastParticipatingParticipantIds: ids =>
        ({ ui: { participation: { edit: { lastParticipatingParticipantIds: { $set: ids } } } } })
};
