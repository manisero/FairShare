import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { enableEventsInDispatchMapping } from 'utils/reactReduxUtils'
import createStore from './store/'
import initEvents from './logic/'
import Root from './components/Root.jsx'

let store = createStore();
let events = initEvents(store);

enableEventsInDispatchMapping(events, store.store);

let root = (
	<Provider store={store.store}>
		<Root store={store} events={events} />
	</Provider>
);

render(root, document.getElementById('root'));
