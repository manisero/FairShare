import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Right } from 'compUtils'
import { Button, TextBox } from 'inputs'

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

// AddedParticipants

let AddedParticipants = ({ participants, onNameChange, onRemoveClick }) => {
	let participantAdders = participants.map((p, i) => (
		<ParticipantAdder key={i} participant={p} onNameChange={val => onNameChange(i, val)}>
			<Button tabIndex={-1} onClick={() => onRemoveClick(i)}><span className='glyphicon glyphicon-remove' /></Button>
		</ParticipantAdder>
	));

	return (
		<div>
			{participantAdders}
		</div>
	);
};

let addedParticipantsMappings = {
	mapStateToProps: state => ({
		participants: queries.toAdd_allAdded(state, EntityType.participant)
	}),
	mapEventsToProps: events => ({
		onNameChange: (index, name) => events.participantsAdd_Updated(index, { name: { $set: name } }),
		onRemoveClick: index => events.participantsAdd_Removed(index)
	})
};

AddedParticipants = connect(addedParticipantsMappings.mapStateToProps, addedParticipantsMappings.mapEventsToProps)(AddedParticipants);

// NextParticipant

class NextParticipant extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddClick = this.handleAddClick.bind(this);
	}

	componentDidMount() {
		console.log('a');
		this.adder.focus();
	}

	handleAddClick() {
		this.props.onAddClick();
		this.adder.focus();
	}

	render() {
		let { participant, onAddClick, onNameChange } = this.props;
		
		return (
			<form>
				<ParticipantAdder ref={x => this.adder = x} participant={participant} onNameChange={val => onNameChange(val)}>
					<Button isSubmit onClick={this.handleAddClick}>Add</Button>
				</ParticipantAdder>
			</form>
		);
	}
};

let nextParticipantMappings = {
	mapStateToProps: state => ({
		participant: queries.toAdd_next(state, EntityType.participant)
	}),
	mapEventsToProps: events => ({
		onAddClick: () => events.participantsAdd_Added(),
		onNameChange: name => events.participantsAdd_NextUpdated({ name: { $set: name } })
	})
};

NextParticipant = connect(nextParticipantMappings.mapStateToProps, nextParticipantMappings.mapEventsToProps)(NextParticipant);

export { AddedParticipants, NextParticipant };
