import getParameterNames from 'get-parameter-names' 
import { mapObject } from 'jsUtils'

/*
Assumptions:
- action data object layout: { param1, param2, ..., paramN }
- action data creator parameters: param1, param2, ..., paramN
- action creator parameters: [action data creator parameters], origin
- command parameters: state, [action data creator parameters]
*/

let createActionCreatorsFromCommands = commands =>
    mapObject(commands, createActionCreatorFromCommand);

let createActionCreatorFromCommand = (command, commandName) => {
    let actionType = commandName;
    let commandParamNames = getParameterNames(command);
    let actionDataFieldNames = commandParamNames.slice(1);

    let actionCreator = createActionCreator(actionType, actionDataFieldNames);

    return actionCreator;
};

let createActionCreator = (actionType, dataFieldNames) => {
    let actionCreatorParamNames = [ ...dataFieldNames, 'origin' ];
    let actionDataCreator = createActionDataCreator(actionType, dataFieldNames);

    let actionCreator = (...args) => {
        if (args.length != actionCreatorParamNames.length) {
            throw { message: 'Action creator was called with wrong arguments.', actionType, creatorParams: actionCreatorParamNames, callArgs: args };
        }

        let actionDataCreatorArgs = args.slice(0, -1);
        let originArg = args[args.length - 1];

        return {
            type: actionType,
            data: actionDataCreator.apply(null, actionDataCreatorArgs),
            origin: originArg
        };
    };

    actionCreator.type = actionType;

    return actionCreator;
};

let createActionDataCreator = (actionType, dataFieldNames) => {
    return (...args) => {
        if (args.length != dataFieldNames.length) {
            throw { message: 'Action data creator was called with wrong arguments.', actionType, creatorParams: dataFieldNames, callArgs: args };
        }

        let actionData = {};

        for (var i = 0; i < dataFieldNames.length; i++) {
            actionData[dataFieldNames[i]] = args[i];
        }

        return actionData;
    };
};

export { createActionCreatorsFromCommands, createActionCreator };
