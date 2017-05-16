import React from 'react'
import { render } from 'react-dom'
import createStore from './store/'
import initEvents from './logic/'
import Root from './components/Root.jsx'

let store = createStore();
let events = initEvents(store);
// TODO: Think on some object for queries (querying data from Redux store)
// so that React components would only have access to commands (events) and queries 

render(
	React.createElement(
		Root,
		{
			store: store,
			events: events
		}),
	document.getElementById('root'));
