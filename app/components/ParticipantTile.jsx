import React from 'react'
import { connect } from 'reactReduxUtils'

let ParticipantTile = ({ participantId, name, contribution }) => (
	<div>
		<div>Id: {participantId}</div>
		<div>Name: {name}</div>
		<div>Contribution: {contribution}</div>
	</div>
);

let mapStateToProps = (state, { participantId }) => {
	let participant = state.data.participants.items[participantId]; 

	return {
		name: participant.name,
		contribution: participant.contribution
	};
};

export default connect(mapStateToProps)(ParticipantTile);
