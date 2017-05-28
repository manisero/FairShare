let actions = {
    ADD_INPUT: 'ADD_INPUT',
    CHANGE_INPUT: 'CHANGE_INPUT',
    UPDATE_INPUT_INFO: 'UPDATE_INPUT_INFO',
    UPDATE_GLOBAL_INFO: 'UPDATE_GLOBAL_INFO'
};

let createActionDispatchers = (store) => ({

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

// Experimental approach:

let actionCreators = {

    addInput: (origin) => ({
        origin
    }),

    changeInput: (inputId, value, origin) => ({
        inputId,
        value,
        origin
    }),

    updateInputInfo: (inputId, origin) => ({
        inputId,
        origin
    }),

    updateGlobalInfo: (origin) => ({
        origin
    })

};

// TODO:
// Consider the following action structure: { type: 'changeInput', payload: { inputId: 1, value: 'a' }, origin: { ... } }.
// This way:
// - the below loop won't modify action returned by creator,
// - actionCreators won't need to accept origin parameter.

Object.keys(actionCreators).forEach(actionType => {
    let creator = actionCreators[actionType];

    let creatorWithType = (...args) => {
        let action = creator.apply(null, args);
        action.type = actionType;

        return action;
    };

    creatorWithType.type = actionType;

    actionCreators[actionType] = creatorWithType;
});

export { actions, createActionDispatchers };
