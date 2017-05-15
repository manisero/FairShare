import { createStore } from 'redux'
import events from './events'

// dev tools
let reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

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
	case events.INPUT_CHANGED:
		return {
			input: {
				value: action.value,
				length: action.value.length
			},
			info: state.info
		};
	case events.INPUT_LENGTH_CHANGED:
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

	let ev = events;

	return {
		getState: store.getState,
		subscribe: callback => store.subscribe(() => callback(store.getState())),
		events: {
			inputChanged: value => store.dispatch({
				type: events.INPUT_CHANGED,
				value: value
			}),
			inputLengthChanged: length => store.dispatch({
				type: events.INPUT_LENGTH_CHANGED,
				length: length
			})
		}
	};
}

export default initStore;
