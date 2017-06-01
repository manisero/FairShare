import { createStore as reduxCreateStore } from 'redux'
import { createActionDispatchers } from 'framework/store'
import initialState from './initialState'
import { actions, reducer } from './actions'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let createStore = () => {
	let store = reduxCreateStore(reducer, initialState, reduxDevTools);
	store.actions = createActionDispatchers(actions, store.dispatch);

	return store;
};

export default createStore;
