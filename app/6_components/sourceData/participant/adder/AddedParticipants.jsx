import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Button } from 'inputs'
import ParticipantAdder from './ParticipantAdder.jsx'

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

let mapStateToProps = state => ({
    participants: queries.toAdd_allAdded(state, EntityType.participant)
});

let mapEventsToProps = events => ({
    onNameChange: (index, name) => events.participantsAdd_Updated(index, { name: { $set: name } }),
    onRemoveClick: index => events.participantsAdd_Removed(index)
});

export default connect(mapStateToProps, mapEventsToProps)(AddedParticipants);
