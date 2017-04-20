class TextBox extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);

		var storeState = props.store.getState();

		this.state = {
			value: storeState.input.value,
			valueLength: storeState.input.length
		};
	}

	componentDidMount() {
		var self = this;

		this.props.store.subscribe(function(storeState) {
			self.setState({
				value: storeState.input.value,
				valueLength: storeState.input.length
			});
		});
	}

	componentWillUnmount() {
	}

	handleInputChange(event) {
		commands.changeInput(event.target.value);
	}

	render() {
		return React.createElement(
				'div',
				null,
				React.createElement(
					'input',
					{
						type: 'text',
						value: this.state.value,
						onChange: this.handleInputChange
					},
					null),
				React.createElement(
					'div',
					null,
					'Length: ' + this.state.valueLength)
			);
	}
}

class Info extends React.Component {
	constructor(props) {
		super(props);

		var storeState = props.store.getState();

		this.state = {
			inputLength: storeState.info.inputLength
		};
	}

	componentDidMount() {
		var self = this;

		this.props.store.subscribe(function(storeState) {
			self.setState({
				inputLength: storeState.info.inputLength
			});
		});
	}

	componentWillUnmount() {
	}

	render() {
		return React.createElement(
				'div',
				null,
				'Input length: ' + this.state.inputLength
			);
	}
}

class Root extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement(
				'div',
				null,
				React.createElement(TextBox, this.props),
				React.createElement(Info, this.props)
				);
	}
}
