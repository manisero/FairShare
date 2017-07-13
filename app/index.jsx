import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { enableEventsInDispatchMapping } from 'reactReduxUtils'
import { EntityType } from 'model'
import createStore from 'store'
import { actions } from 'actions'
import initLogic from 'logic'
import Root from 'components/Root.jsx'

let store = createStore();
let events = initLogic(store);

enableEventsInDispatchMapping(events, store);

let root = (
	<Provider store={store}>
		<Root />
	</Provider>
);

render(root, document.getElementById('root'));

// test setup:
events.participantDeselected();
