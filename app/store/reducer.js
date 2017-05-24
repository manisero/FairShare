import { actions } from './actions'

// TODO: Consider using some immutability helper

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

    let newStatePart = {
         lastInputId: inputId,
         inputIds: state.inputIds.concat([inputId]),
         inputs: Object.assign({}, state.inputs, { [inputId]: inputItem })
    };

    return Object.assign({}, state, newStatePart);
};

let updateInput = (inputId, newInputItemPart, state) => {
    let inputItem = Object.assign({}, state.inputs[inputId], newInputItemPart);
    let inputs = Object.assign({}, state.inputs, { [inputId]: inputItem }); 

    return Object.assign({}, state, { inputs });
};

let updateGlobalInfo = state => {
    let totalLength = state.inputIds
                           .map(id => state.inputs[id].input.value.length)
                           .reduce((x, y) => x + y, 0);

    let globalInfo = {
        totalLength: totalLength,
        averageLength: totalLength / state.inputIds.length
    };

    return Object.assign({}, state, { globalInfo });
};

export default (state, action) => {
    switch (action.type) {

    case actions.ADD_INPUT:
        return addInput(state);

    case actions.CHANGE_INPUT:
        let input = {
            value: action.value
        };

        return updateInput(action.inputId, { input }, state);

    case actions.UPDATE_INPUT_INFO:
        let info = {
            inputLength: state.inputs[action.inputId].input.value.length
        };

        return updateInput(action.inputId, { info }, state);
    
    case actions.UPDATE_GLOBAL_INFO:
        return updateGlobalInfo(state);

    default:
        return state;
    }
};
