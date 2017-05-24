import { createStore as reduxCreateStore } from 'redux'
import initialState from './initialState'
import reducer from './reducer'
import { createActionDispatchers } from './actions'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let createStore = () => {
	let store = reduxCreateStore(reducer, initialState, reduxDevTools);
	store.actions = createActionDispatchers(store);

	return store;
};

export default createStore;
