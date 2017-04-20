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
