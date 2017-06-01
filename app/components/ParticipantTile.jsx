import React from 'react'
import { connect } from 'reactReduxUtils'

let ParticipantTile = ({ participant, onClick }) => (
	<div onClick={() => onClick()}>
		<div>Name: {participant.name}</div>
		<div>Contribution: {participant.contribution}</div>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.data.participants.items[participantId]
});

let mapEventsToProps = (events, { participantId }) => ({
	onClick: () => events.participantSelected(participantId)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantTile);
