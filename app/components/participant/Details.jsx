import React from 'react'
import { connect } from 'reactReduxUtils'
import { Right } from 'compUtils'
import { Button, ButtonGroup } from 'inputs'

let ParticipantDetails = ({ participant, onEditClick, onDeleteClick, onCancelClick }) => (
	<div>
		<div>Name: {participant.name}</div>
		<div>Contribution: {participant.contribution}</div>
		<Right>
			<ButtonGroup>
				<Button onClick={onEditClick}>Edit</Button>
				<Button onClick={onDeleteClick}>Delete</Button>
				<Button onClick={onCancelClick}>Cancel</Button>
			</ButtonGroup>
		</Right>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.data.participant.items[participantId] 
});

let mapEventsToProps = (events, { participantId }) => ({
	onEditClick: () => events.participantEditStarted(participantId),
	onDeleteClick: () => events.participantDeleteStarted(participantId),
	onCancelClick: () => events.participantDeselected()
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantDetails);
