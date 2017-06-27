import React from 'react'
import { connect } from 'reactReduxUtils'
import { Button, ButtonGroup } from 'inputs'

let ParticipantDetails = ({ participant, onEditClick }) => (
	<div>
		<div>Name: {participant.name}</div>
		<div>Contribution: {participant.contribution}</div>
		<ButtonGroup>
			<Button onClick={onEditClick}>Edit</Button>
			<Button>Remove</Button>
		</ButtonGroup>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.data.participants.items[participantId] 
});

let mapEventsToProps = (events, { participantId }) => ({
	onEditClick: () => events.participantEditingStarted(participantId) 
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantDetails);
