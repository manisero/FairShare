import update from 'immutability-helper';
import { actions } from './actions'

let addInput = (state) => {
    let inputId = state.lastInputId + 1;

    let inputItem = {
        input: {
            value: ''
        },
        info: {
            inputLength: 0
        }
    };

    return update(state, {
        lastInputId: { $set: inputId },
        inputIds: { $push: [ inputId ] },
        inputs: { [inputId]: { $set: inputItem } }
    });
};

let updateInput = (inputId, updateCommand, state) => update(state, { inputs: { [inputId]: updateCommand } });

let updateGlobalInfo = state => {
    let totalLength = state.inputIds
                           .map(id => state.inputs[id].input.value.length)
                           .reduce((x, y) => x + y, 0);

    let averageLength = totalLength / state.inputIds.length;

    return update(state, {
        globalInfo: {
            totalLength: { $set: totalLength },
            averageLength: { $set: averageLength }
        }
    });
};

export default (state, action) => {
    switch (action.type) {

    case actions.ADD_INPUT:
        return addInput(state);

    case actions.CHANGE_INPUT:
        return updateInput(action.inputId, { input: { value: { $set: action.value } } }, state);

    case actions.UPDATE_INPUT_INFO:
        let inputLength = state.inputs[action.inputId].input.value.length;
        return updateInput(action.inputId, { info: { inputLength: { $set: inputLength } } }, state);
    
    case actions.UPDATE_GLOBAL_INFO:
        return updateGlobalInfo(state);

    default:
        return state;
    }
};
