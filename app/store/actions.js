let actions = {
    CHANGE_INPUT: 'CHANGE_INPUT',
    CHANGE_INPUT_LENGTH: 'CHANGE_INPUT_LENGTH'
};

let createActionDispatchers = (store) => ({

    changeInput: (value, origin) => store.dispatch({
        type: actions.CHANGE_INPUT,
        value: value,
        origin
    }),

    changeInputLength: (length, origin) => store.dispatch({
        type: actions.CHANGE_INPUT_LENGTH,
        length: length,
        origin
    })
    
});

export { actions, createActionDispatchers };
