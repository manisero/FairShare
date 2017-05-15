import { actions } from './actions'

let reducer = (state, action) => {
	switch (action.type) {
	case actions.CHANGE_INPUT:
		return onChangeInput(state, action);
	case actions.CHANGE_INPUT_LENGTH:
		return onChangeInputLength(state, action);
	default:
		return state;
	}
};

let onChangeInput = (state, action) => ({
    input: {
        value: action.value,
        length: action.value.length
    },
    info: state.info
});

let onChangeInputLength = (state, action) => ({
    input: state.input,
    info: {
        inputLength: action.length
    }
});

export default reducer;
