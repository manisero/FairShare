import React from 'react'
import { connect } from 'reactReduxUtils'
import { Right } from 'compUtils'
import { Button, ButtonGroup } from 'inputs'

let ParticipantDetails = ({ participant, onEditClick, onDeleteClick }) => (
	<div>
		<div>Name: {participant.name}</div>
		<div>Contribution: {participant.contribution}</div>
		<Right>
			<ButtonGroup>
				<Button onClick={onEditClick}>Edit</Button>
				<Button onClick={onDeleteClick}>Delete</Button>
			</ButtonGroup>
		</Right>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.data.participant.items[participantId] 
});

let mapEventsToProps = (events, { participantId }) => ({
	onEditClick: () => events.participantEditingStarted(participantId),
	onDeleteClick: () => events.participantDeletingStarted(participantId)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantDetails);
