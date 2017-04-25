import React from 'react'

class Info extends React.Component {
	constructor(props) {
		super(props);

		var storeState = props.store.getState();

		this.state = {
			inputLength: storeState.info.inputLength
		};
	}

	componentDidMount() {
		this.props.store.subscribe(storeState =>
			this.setState({
				inputLength: storeState.info.inputLength
			})
		);
	}

	componentWillUnmount() {
	}

	render() {
		return (
			<div>
				Input length: {this.state.inputLength}
			</div>
		);
	}
}

export default Info;
