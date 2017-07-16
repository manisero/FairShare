import { createStore as reduxCreateStore } from 'redux'
import initialState from 'state/initialState'
import { actions } from './actions'
import reducer from './reducer'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let createStore = () => {
    let store = reduxCreateStore(reducer, initialState, reduxDevTools);
    
    store.dispatchBatch = (actionsBatch, origin) => {
        if (actionsBatch.length == 1) {
            store.dispatch(actionsBatch[0]);
        } else {
            store.dispatch(actions.BATCH(actionsBatch, origin));
        }
    };

    return store;
};

export default createStore;
