import { mapObject } from 'jsUtils'

let createActionCreator = (dataCreator, actionType) => {
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

    return actionCreator;
};

let createActions = actionDataCreators => mapObject(actionDataCreators, createActionCreator);

export { createActions };
