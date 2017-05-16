import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './store/'
import initEvents from './logic/'
import Root from './components/Root.jsx'

let store = createStore();
let events = initEvents(store);
// TODO: Think on some object for queries (querying data from Redux store)
// so that React components would only have access to commands (events) and queries 

store.store.dispatch.events = events;

let root = (
	<Provider store={store.store}>
		<Root store={store} events={events} />
	</Provider>
);

render(root, document.getElementById('root'));
