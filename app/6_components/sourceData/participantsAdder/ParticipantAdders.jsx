import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Right } from 'compUtils'
import { Button, TextBox } from 'inputs'

let ParticipantAdder = ({ participant, onNameChange, children }) => (
	<div className='row'>
		<div className='col-xs-9'>
			<TextBox ref={x => {if (x) x.focus();}} placeholder='Name' valueString={participant.name} onChange={x => onNameChange(x)} />
		</div>
		<div className='col-xs-3'>
			<Right>
				{children}
			</Right>
		</div>
	</div>
);

// AddedParticipants

let AddedParticipants = ({ participants, onNameChange, onRemoveClick }) => {
	let participantAdders = participants.map((p, i) => (
		<ParticipantAdder key={i} participant={p} onNameChange={val => onNameChange(i, val)}>
			<Button tabIndex={-1} onClick={() => onRemoveClick(i)}>X</Button>
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

let NextParticipant = ({ participant, onAddClick, onNameChange }) => {
	return (
		<form>
			<ParticipantAdder participant={participant} onNameChange={val => onNameChange(val)}>
				<Button isSubmit onClick={onAddClick}>Add</Button>
			</ParticipantAdder>
		</form>
	);
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
