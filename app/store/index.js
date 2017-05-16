import { createStore as reduxCreateStore } from 'redux'
import initialState from './initialState'
import reducer from './reducer'
import { createActionDispatchers } from './actions'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let createStore = () => {
	let store = reduxCreateStore(reducer, initialState, reduxDevTools);
	let actionDispatchers = createActionDispatchers(store);

	return {
		store: store, // TODO: Decide on exposed objects (try not to expose store)
		actions: actionDispatchers
	};
};

export default createStore;
