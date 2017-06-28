import React from 'react'
import { connect } from 'reactReduxUtils'

let ParticipantShowcase = ({ participant }) => (
	<div>
		<div>Name: {participant.name}</div>
		<div>Contribution: {participant.contribution}</div>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.data.participant.items[participantId] 
});

export default connect(mapStateToProps)(ParticipantShowcase);
