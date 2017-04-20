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

export default Info;
