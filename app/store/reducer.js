import events from './events'

let onInputChanged = (state, action) => ({
    input: {
        value: action.value,
        length: action.value.length
    },
    info: state.info
});

let onInputLengthChanged = (state, action) => ({
    input: state.input,
    info: {
        inputLength: action.length
    }
});

export default (state, action) => {
	switch (action.type) {
	case events.INPUT_CHANGED:
		return onInputChanged(state, action);
	case events.INPUT_LENGTH_CHANGED:
		return onInputLengthChanged(state, action);
	default:
		return state;
	}
};
