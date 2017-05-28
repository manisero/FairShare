let actions = {
    ADD_INPUT: 'ADD_INPUT',
    CHANGE_INPUT: 'CHANGE_INPUT',
    UPDATE_INPUT_INFO: 'UPDATE_INPUT_INFO',
    UPDATE_GLOBAL_INFO: 'UPDATE_GLOBAL_INFO'
};

let createActionDispatchers = (store) => ({
    // TODO: Consider making action type a property of action dispatcher (problem: this function depends on store, store depends on reducer, reducer depends on action types)

    addInput: (origin) => store.dispatch({
        type: actions.ADD_INPUT,
        origin
    }),

    changeInput: (inputId, value, origin) => store.dispatch({
        type: actions.CHANGE_INPUT,
        inputId,
        value,
        origin
    }),

    updateInputInfo: (inputId, origin) => store.dispatch({
        type: actions.UPDATE_INPUT_INFO,
        inputId,
        origin
    }),

    updateGlobalInfo: (origin) => store.dispatch({
        type: actions.UPDATE_GLOBAL_INFO,
        origin
    })
    
});

export { actions, createActionDispatchers };
