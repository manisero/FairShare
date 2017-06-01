import { mapObject } from 'jsUtils'

let actionDataCreators = {
    selectParticipant: participantId => ({ participantId }),
    updateParticipant: (participantId, name, contribution) => ({ participantId, name, contribution })
};

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

let actions = mapObject(actionDataCreators, createActionCreator);

let createActionDispatchers = dispatch => mapObject(actions, action => (...args) => dispatch(action.apply(null, args)));

export { actions, createActionDispatchers };
