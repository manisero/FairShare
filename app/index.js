import React from 'react'
import { render } from 'react-dom'
import initStore from './store/store'
import initLogic from './logic'
import Root from './components/Root.jsx'

let store = initStore();
let commands = initLogic(store);

render(
	React.createElement(
		Root,
		{
			store: store,
			commands: commands
		}),
	document.getElementById('root'));
