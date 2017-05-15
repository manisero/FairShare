import { createStore } from 'redux'

// dev tools
let reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// events
let INPUT_CHANGED = 'INPUT_CHANGED';
let INPUT_LENGTH_CHANGED = 'INPUT_LENGTH_CHANGED';

// initial state
let initialInputValue = 'test';

let state = {
	input: {
		value: initialInputValue,
		length: initialInputValue.length
	},
	info: {
		inputLength: initialInputValue.length
	}
};

// reducer
let reducer = (state, action) => {
	switch (action.type) {
	case INPUT_CHANGED:
		return {
			input: {
				value: action.value,
				length: action.value.length
			},
			info: state.info
		};
	case INPUT_LENGTH_CHANGED:
		return {
			input: state.input,
			info: {
				inputLength: action.length
			}
		};
	default:
		return state;
	}
};

// initStore
let initStore = function() {
	let store = createStore(reducer, state, reduxDevTools);

	return {
		getState: store.getState,
		subscribe: callback => store.subscribe(() => callback(store.getState())),
		events: {
			inputChanged: value => store.dispatch({
				type: INPUT_CHANGED,
				value: value
			}),
			inputLengthChanged: length => store.dispatch({
				type: INPUT_LENGTH_CHANGED,
				length: length
			})
		}
	};
}

export default initStore;
