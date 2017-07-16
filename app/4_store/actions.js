import update from 'immutability-helper'
import { createActionCreatorsFromCommands, createActionCreator } from 'framework/store'
import stateCommands from 'state/commands'

let actions = createActionCreatorsFromCommands(stateCommands);
actions.BATCH = createActionCreator('BATCH', [ 'actions' ])

let reducer = (state, action) => {
    let command = stateCommands[action.type];

    if (command != null) {
        let commandArgs = Object.values(action.data);
        let updateCommand = command(state, ...commandArgs);

        return update(state, updateCommand);
    } else {
        return state;
    }
};

let reducerWithBatchSupport = (state, action) => {
    if (action.type == actions.BATCH.type) {
        return action.data.actions.reduce(reducer, state);
    } else {
        return reducer(state, action);
    };
};

export { actions, reducerWithBatchSupport as reducer };
