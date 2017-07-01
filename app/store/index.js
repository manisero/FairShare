import { createStore as reduxCreateStore } from 'redux'
import initialState from './initialState'
import { actions, reducer } from './actions'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let createStore = () => reduxCreateStore(reducer, initialState, reduxDevTools);

export default createStore;
