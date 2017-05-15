import React from 'react'
import { render } from 'react-dom'
import createStore from './store/'
import initLogic from './logic'
import Root from './components/Root.jsx'

let store = createStore();
let commands = initLogic(store);
// TODO: Think on some object for queries (querying data from store state)
// so that react components would see only commands (container components) and queries (presentational components) 

render(
	React.createElement(
		Root,
		{
			store: store,
			commands: commands
		}),
	document.getElementById('root'));
