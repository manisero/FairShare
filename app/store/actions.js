let actions = {
    CHANGE_INPUT: 'CHANGE_INPUT',
    CHANGE_INPUT_LENGTH: 'CHANGE_INPUT_LENGTH'
};

let createActionDispatchers = (store) => ({
    changeInput: value => store.dispatch({
        type: actions.CHANGE_INPUT,
        value: value
    }),
    changeInputLength: length => store.dispatch({
        type: actions.CHANGE_INPUT_LENGTH,
        length: length
    })
});

export { actions, createActionDispatchers };
