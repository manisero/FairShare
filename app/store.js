import { createStore } from 'redux'

var initStore = function() {
	// events
	var INPUT_CHANGED = 'INPUT_CHANGED';
	var INPUT_LENGTH_CHANGED = 'INPUT_LENGTH_CHANGED';

	// initial state
	var initialInputValue = 'test';

	var state = {
		input: {
			value: initialInputValue,
			length: initialInputValue.length
		},
		info: {
			inputLength: initialInputValue.length
		}
	};

	// reducer
	var reducer = (state, action) => {
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

	// store
	var reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
	var store = createStore(reducer, state, reduxDevTools);

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
