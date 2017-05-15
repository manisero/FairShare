import { createStore as reduxCreateStore } from 'redux'
import initialState from './initialState'
import reducer from './reducer'
import { createActionDispatchers } from './actions'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let createStore = () => {
	let store = reduxCreateStore(reducer, initialState, reduxDevTools);
	let actionDispatchers = createActionDispatchers(store);

	return {
		actions: actionDispatchers,
		// TODO: Decide on exposed objects (try not to expose store)
		store: store,
		getState: store.getState,
		subscribe: callback => store.subscribe(() => callback(store.getState())),
	};
}

export default createStore;
