import { actions } from './actions'

export default (state, action) => {
    switch (action.type) {
    case actions.CHANGE_INPUT:
        let input = {
            value: action.value,
            length: action.value.length
        };

        return Object.assign({}, state, { input });
    case actions.UPDATE_INPUT_INFO:
        let info = {
            inputLength: state.input.value.length
        };

        return Object.assign({}, state, { info });
    default:
        return state;
    }
};
