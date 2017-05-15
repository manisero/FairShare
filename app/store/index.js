import { createStore } from 'redux'
import events from './events'
import initialState from './initialState'
import reducer from './reducer'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let initStore = function() {
	let store = createStore(reducer, initialState, reduxDevTools);

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
