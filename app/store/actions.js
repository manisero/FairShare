let actions = {
    CHANGE_INPUT: 'CHANGE_INPUT',
    UPDATE_INPUT_INFO: 'UPDATE_INPUT_INFO'
};

let createActionDispatchers = (store) => ({

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
    })
    
});

export { actions, createActionDispatchers };
