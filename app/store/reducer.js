import { combineReducers } from "redux";
import { actions } from './actions'

let input = (state = { value: '', length: 0 }, action) => {
    if (action.type === actions.CHANGE_INPUT) {
        return {
            value: action.value,
            length: action.value.length
        };
    } else {
        return state;
    }
};

let info = (state = { inputLength: 0 }, action) => {
    if (action.type === actions.CHANGE_INPUT_LENGTH) {
        return {
            inputLength: action.length
        };
    } else {
        return state;
    }
};

export default combineReducers({ input, info });
