import update from 'immutability-helper'
import { createActions } from 'framework/store'
import stateCommands from './stateCommands'

let actions = createActions({
    BATCH: actions => ({ actions }),
    // data:
    addEntity: (entity, id, data) => ({ entity, id, data }),
    updateEntity: (entity, id, data) => ({ entity, id, data }),
    deleteEntity: (entity, id) => ({ entity, id }),
    // ui:
    setFocus: (entity, id, mode) => ({ entity, id, mode }),
    clearFocus: entity => ({ entity }),
    setEdit: (entity, id, data) => ({ entity, id, data }),
    clearEdit: (entity, id) => ({ entity, id })
});

let reducer = (state, action) => {
    let command = stateCommands[action.type];

    if (command != null) {
        let commandArgs = Object.values(action.data);

        return update(state, command(...commandArgs, state));
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
