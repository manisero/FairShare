import React from 'react'
import { Right } from 'compUtils'
import { TextBox } from 'inputs'

class ParticipantAdder extends React.Component {
	constructor(props) {
		super(props);
		this.focus = this.focus.bind(this);
	}

	focus() {
		this.nameInput.focus();
	}

	render() {
		let { participant, onNameChange, children } = this.props;

		return (
			<div className='row'>
				<div className='col-xs-9 form-horizontal'>
					<TextBox ref={x => this.nameInput = x} placeholder='Name' valueString={participant.name} onChange={x => onNameChange(x)} />
				</div>
				<div className='col-xs-3'>
					<Right>
						{children}
					</Right>
				</div>
			</div>
		);
	}
};

export default ParticipantAdder;
