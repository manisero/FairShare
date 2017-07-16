import { EntityCategory } from 'model'

let setFocus = (mode, itemId) => ({
    mode: { $set: mode },
    itemId: { $set: itemId }
});

export default {

    // entities:

    addEntity: (state, entity, id, data) =>
        ({ [EntityCategory[entity]]: { [entity]: {
            lastId: { $set: id },
            ids: { $push: [ id ] },
            items: { [id]: { $set: data } }
        } } }),
    
    updateEntity: (state, entity, id, data) =>
        ({ [EntityCategory[entity]]: { [entity]: { items: { [id]: { $set: data } } } } }),

    deleteEntity: (state, entity, id) => {
        let idIndex = state[EntityCategory[entity]][entity].ids.indexOf(id);

        return { [EntityCategory[entity]]: { [entity]: {
            ids: { $splice: [[ idIndex, 1 ]] },
            items: { $unset: [id] }
        } } };
    },

    deleteAllEntities: (state, entity) => 
        ({ [EntityCategory[entity]]: { [entity]: {
            ids: { $set: [] },
            items: { $set: {} }
        } } }),

    // ui:

    setFocus: (state, entity, mode, id) =>
        ({ ui: { [entity]: { focus: setFocus(mode, id) } } }),
    
    clearFocus: (state, entity) =>
        ({ ui: { [entity]: { focus: setFocus(null, null) } } }),

    setNextToAdd: (state, entity, data) =>
        ({ ui: { [entity]: { toAdd: { next: { $set: data } } } } }),

    addToAdd: (state, entity, data) =>
        ({ ui: { [entity]: { toAdd: { items: { $push: [ data ] } } } } }),

    updateToAdd: (state, entity, index, data) =>
        ({ ui: { [entity]: { toAdd: { items: { [index]: { $set: data } } } } } }),

    removeToAdd: (state, entity, index) =>
        ({ ui: { [entity]: { toAdd: { items: { $splice: [[ index, 1 ]] } } } } }),

    clearToAdd: (state, entity) =>
        ({ ui: { [entity]: { toAdd: {
            items: { $set: [] },
            next: { $set: null }
        } } } }),

    setEdit: (state, entity, id, data) =>
        state.ui[entity].edit.items[id] == null
            ? ({ ui: { [entity]: { edit: { items: { [id]: { $set: { data: data } } } } } } })
            : ({ ui: { [entity]: { edit: { items: { [id]: { data: { $set: data } } } } } } }),

    clearEdit: (state, entity, id) =>
        ({ ui: { [entity]: { edit: { items: { $unset: [id] } } } } }),

    setEditError: (state, entity, id, error) =>
        ({ ui: { [entity]: { edit: { items: { [id]: { error: { $set: error } } } } } } }),

    clearEditError: (state, entity, id, error) =>
        ({ ui: { [entity]: { edit: { items: { [id]: { $unset: ['error'] } } } } } }),

    // non-generic:

    setParticipationEditMode: (state, mode) =>
        ({ ui: { participation: { edit: { mode: { $set: mode } } } } }),

    setParticipatingParticipantIdsCache: (state, ids) =>
        ({ ui: { participation: { edit: { participatingParticipantIdsCache: { $set: ids } } } } }),
    
    addParticipatingParticipantsToCache: (state, ids) =>
        ({ ui: { participation: { edit: { participatingParticipantIdsCache: { $push: ids } } } } })

};
