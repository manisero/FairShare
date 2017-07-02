export default {
    // data:
    entityLastId: (state, entity) => state.data[entity].lastId,
    entityIds: (state, entity) => state.data[entity].ids,
    entityAllData: (state, entity) => state.data[entity].items,
    entityData: (state, entity, id) => state.data[entity].items[id],
    // ui:
    focus: (state, entity) => state.ui[entity].focus,
    edit: (state, entity, id) => state.ui[entity].edit[id]
};
