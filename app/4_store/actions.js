import update from 'immutability-helper'
import { createActions } from 'framework/store'
import stateCommands from 'state/commands'

let actions = createActions({
    BATCH: actions => ({ actions }),
    // data:
    addEntity: (entity, id, data) => ({ entity, id, data }),
    updateEntity: (entity, id, data) => ({ entity, id, data }),
    deleteEntity: (entity, id) => ({ entity, id }),
    deleteAllEntities: entity => ({ entity }),
    // ui:
    setFocus: (entity, mode, id) => ({ entity, mode, id }),
    clearFocus: entity => ({ entity }),
    setNextToAdd: (entity, data) => ({ entity, data }),
    addToAdd: (entity, data) => ({ entity, data }),
    updateToAdd: (entity, index, data) => ({ entity, index, data }),
    removeToAdd: (entity, index) => ({ entity, index }),
    clearToAdd: entity => ({ entity }),
    setEdit: (entity, id, data) => ({ entity, id, data }),
    clearEdit: (entity, id) => ({ entity, id }),
    setEditError: (entity, id, error) => ({ entity, id, error }),
    clearEditError: (entity, id, error) => ({ entity, id, error }),
    // non-generic:
    setParticipationEditMode: mode => ({ mode }),
    setParticipatingParticipantIdsCache: ids => ({ ids}),
    addParticipatingParticipantsToCache: ids => ({ ids })
});

let reducer = (state, action) => {
    let command = stateCommands[action.type];

    if (command != null) {
        let commandArgs = Object.values(action.data);
        let updateCommand =  command(...commandArgs, state);

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
