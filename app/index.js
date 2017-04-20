import initStore from './store'
import initLogic from './logic'
import Root from './components/Root'

var store = initStore();
var commands = initLogic(store);

ReactDOM.render(
	React.createElement(
		Root,
		{
			store: store,
			commands: commands
		}),
	document.getElementById('root'));
