import update from 'immutability-helper'
import { createActions } from 'framework/store'
import { EntityType } from 'model'
import { stateOperations, stateCommands } from './stateOperations'

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
    clearEdit: (entity, id) => ({ entity, id }),
    // Obsolete:
    selectEntity: (entity, id) => ({ entity, id }), // remove
    deselectEntity: entity => ({ entity }), // remove
    //addEntity: (entity, id, data) => ({ entity, id, data }), // remove
    editEntity_start: (entity, id) => ({ entity, id }), // remove
    editEntity_update: (entity, id, newData) => ({ entity, id, newData }), // remove
    editEntity_submitFocused: entity => ({ entity }),
    editEntity_cancelFocused: entity => ({ entity }),
    deleteEntity_start: (entity, id) => ({ entity, id }),
    deleteEntity_submitFocused: entity => ({ entity }),
    deleteEntity_cancelFocused: entity => ({ entity }) // remove
});

let reducer = (state, action) => {
    let command = stateCommands[action.type];

    if (command != null) {
        let commandArgs = Object.values(action.data);
        return update(state, command(...commandArgs, state));
    }

    switch (action.type) {

    case actions.selectEntity.type:
        return stateOperations.selectEntity(action.data.entity, action.data.id, state);
    
    case actions.deselectEntity.type:
        return stateOperations.deselectEntity(action.data.entity, state);
    
    case actions.addEntity.type:
        return stateOperations.addEntity(action.data.entity, action.data.id, action.data.data, state);

    case actions.editEntity_start.type:
        return stateOperations.editEntity.start(action.data.entity, action.data.id, state);
    
    case actions.editEntity_update.type:
        return stateOperations.editEntity.update(action.data.entity, action.data.id, action.data.newData, state);
    
    case actions.editEntity_submitFocused.type:
        return stateOperations.editEntity.submitFocused(action.data.entity, state);

    case actions.editEntity_cancelFocused.type:
        return stateOperations.editEntity.cancelFocused(action.data.entity, state);
    
    case actions.deleteEntity_start.type:
        return stateOperations.deleteEntity.start(action.data.entity, action.data.id, state);
    
    case actions.deleteEntity_submitFocused.type:
        return stateOperations.deleteEntity.submitFocused(action.data.entity, state);

    case actions.deleteEntity_cancelFocused.type:
        return stateOperations.deleteEntity.cancelFocused(action.data.entity, state);

    default:
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
