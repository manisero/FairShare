import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { enableEventsInDispatchMapping } from 'utils/reactReduxUtils'
import createStore from './store/'
import initLogic from './logic/'
import Root from './components/Root.jsx'

let store = createStore();
let events = initLogic(store);

enableEventsInDispatchMapping(events, store);

let root = (
	<Provider store={store}>
		<Root store={store} events={events} />
	</Provider>
);

render(root, document.getElementById('root'));
