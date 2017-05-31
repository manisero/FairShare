let actions = {
    ADD_INPUT: 'addInput',
    CHANGE_INPUT: 'changeInput',
    UPDATE_INPUT_INFO: 'updateInputInfo',
    UPDATE_GLOBAL_INFO: 'updateGlobalInfo'
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

    addInput: () => ({}),

    changeInput: (inputId, value) => ({
        inputId,
        value
    }),

    updateInputInfo: (inputId) => ({
        inputId
    }),

    updateGlobalInfo: () => ({})

};

let actions2 = {};

Object.keys(actionCreators).forEach(actionType => {
    let dataCreator = actionCreators[actionType];

    let actionCreator = (...args) => {
        let creatorParamsCount = dataCreator.length; // TODO: Consider throwing error if args.length < creatorParamsCount
        let creatorArgs = args.slice(0, creatorParamsCount);
        let origin = args.length > creatorParamsCount ? args[creatorParamsCount] : null;

        return {
            type: actionType,
            data: dataCreator.apply(null, creatorArgs),
            origin
        };
    };

    actionCreator.type = actionType;

    actions2[actionType] = actionCreator;
});

let createActionDispatchers2 = (dispatch) => actions2.map(x => (...args) => dispatch(x(args)));

export { actions2 as actions, createActionDispatchers };
