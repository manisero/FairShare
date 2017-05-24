let actions = {
    CHANGE_INPUT: 'CHANGE_INPUT',
    UPDATE_INPUT_INFO: 'UPDATE_INPUT_INFO'
};

let createActionDispatchers = (store) => ({

    changeInput: (value, origin) => store.dispatch({
        type: actions.CHANGE_INPUT,
        value: value,
        origin
    }),

    updateInputInfo: (length, origin) => store.dispatch({
        type: actions.UPDATE_INPUT_INFO,
        length: length,
        origin
    })
    
});

export { actions, createActionDispatchers };
