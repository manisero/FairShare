import { actions } from './actions'

let getNewState = (inputId, newInputItemPart, state) => {
    let inputItem = Object.assign({}, state.inputs[inputId], newInputItemPart);
    let inputs = Object.assign({}, state.inputs, { [inputId]: inputItem }); 

    return Object.assign({}, state, { inputs });
};

export default (state, action) => {
    switch (action.type) {

    case actions.CHANGE_INPUT:
        let input = {
            value: action.value
        };

        return getNewState(action.inputId, { input }, state);

    case actions.UPDATE_INPUT_INFO:
        let info = {
            inputLength: state.inputs[action.inputId].input.value.length
        };

        return getNewState(action.inputId, { info }, state);;
        
    default:
        return state;
    }
};
