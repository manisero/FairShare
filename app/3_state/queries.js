export default {
    
    // data:

    entityLastId: (state, entity) => state.data[entity].lastId,

    entityData: (state, entity, id) => state.data[entity].items[id],

    // ui:

    edit: (state, entity, id) => state.ui[entity].edit[id]
};
