export default {
    // data:
    entityLastId: (state, entity) => state.data[entity].lastId,
    entityIds: (state, entity) => state.data[entity].ids,
    entityAllData: (state, entity) => state.data[entity].items,
    entityData: (state, entity, id) => state.data[entity].items[id],

    itemContributions: (state, itemId) => Object.values(state.data.contribution.items).filter(x => x.itemId === itemId),
    
    // ui:
    focus: (state, entity) => state.ui[entity].focus,
    edit: (state, entity, id) => state.ui[entity].edit[id]
};
