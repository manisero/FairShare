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

let actions = {};

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

    actions[actionType] = actionCreator;
});

let createActionDispatchers = (dispatch) => {
    let dispatchers = {};

    Object.keys(actions).forEach(actionType => {
        let action = actions[actionType];
        dispatchers[actionType] = (...args) => dispatch(action.apply(null, args));
    });

    return dispatchers;
};

export { actions, createActionDispatchers };
