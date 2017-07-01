import { createStore as reduxCreateStore } from 'redux'
import initialState from './initialState'
import { actions, reducer } from './actions'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let createStore = () => {
    let store = reduxCreateStore(reducer, initialState, reduxDevTools);
    store.dispatchBatch = (...args) => store.dispatch(actions.BATCH(args));

    return store;
};

export default createStore;
