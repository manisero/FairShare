import React from 'react'

class TextBox extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);

		let storeState = props.store.getState();

		this.state = {
			value: storeState.input.value,
			valueLength: storeState.input.length
		};
	}

	componentDidMount() {
		this.props.store.subscribe(storeState =>
			this.setState({
				value: storeState.input.value,
				valueLength: storeState.input.length
			})
		);
	}

	componentWillUnmount() {
	}

	handleInputChange(event) {
		this.props.commands.changeInput(event.target.value);
	}

	render() {
		return (
			<div>
				<input type='text' value={this.state.value} onChange={this.handleInputChange} />
				<div>Length: {this.state.valueLength}</div>
			</div>
		);
	}
}

export default TextBox;
