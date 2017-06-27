import React from 'react'
import { connect } from 'reactReduxUtils'
import Button from 'inputs/Button.jsx'

let ParticipantDetails = ({ participant, onEditClick }) => (
	<div>
		<div>Name: {participant.name}</div>
		<div>Contribution: {participant.contribution}</div>
		<Button value='Edit' onClick={onEditClick} />
		<Button value='Remove' />
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.data.participants.items[participantId] 
});

let mapEventsToProps = (events, { participantId }) => ({
	onEditClick: () => alert(participantId) 
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantDetails);
