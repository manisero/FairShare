import { createActions } from 'framework/store'
import { EntityType } from 'model'
import stateOperations from './stateOperations'

let actions = createActions({
    selectEntity: (entity, id) => ({ entity, id }),
    addEntity: (entity, id, data) => ({ entity, id, data }),
    editEntity_start: (entity, id) => ({ entity, id }),
    editEntity_updateFocused: (entity, updateCommand) => ({ entity, updateCommand }),
    editEntity_submitFocused: entity => ({ entity }),
    editEntity_cancelFocused: entity => ({ entity }),
    deleteEntity_start: (entity, id) => ({ entity, id }),
    deleteEntity_submitFocused: entity => ({ entity }),
    deleteEntity_cancelFocused: entity => ({ entity }), 
    // Item:
    selectItem: itemId => ({ itemId }),
    addItem: itemId => ({ itemId }),
    updateItem: (itemId, updateCommand) => ({ itemId, updateCommand })
});

let reducer = (state, action) => {
    switch (action.type) {

    case actions.selectEntity.type:
        return stateOperations.selectEntity(action.data.entity, action.data.id, state);
    
    case actions.addEntity.type:
        return stateOperations.addEntity(action.data.entity, action.data.id, action.data.data, state);

    case actions.editEntity_start.type:
        return stateOperations.editEntity.start(action.data.entity, action.data.id, state);
    
    case actions.editEntity_updateFocused.type:
        return stateOperations.editEntity.updateFocused(action.data.entity, action.data.updateCommand, state);
    
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

    // Item:
    case actions.selectItem.type:
        return stateOperations.selectItem(action.data.itemId, state);
    
    case actions.addItem.type:
        return stateOperations.addItem(action.data.itemId, state);
    
    case actions.updateItem.type:
        return stateOperations.updateItem(action.data.itemId, action.data.updateCommand, state);

    default:
        return state;
    }
};

export { actions, reducer };
