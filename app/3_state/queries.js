import { EntityCategory } from 'model'

export default {
    // entities:
    entityLastId: (state, entity) => state[EntityCategory[entity]][entity].lastId,
    entityIds: (state, entity) => state[EntityCategory[entity]][entity].ids,
    entityAllData: (state, entity) => state[EntityCategory[entity]][entity].items,
    entityData: (state, entity, id) => state[EntityCategory[entity]][entity].items[id],
    
    // ui:
    focus: (state, entity) => state.ui[entity].focus,
    edit: (state, entity, id) => state.ui[entity].edit[id],
    allEdits: (state, entity) => state.ui[entity].edit
};
