import React from 'react'
import { EntityType } from 'model'
import queries from 'queries'
import { connect } from 'reactReduxUtils'

let ParticipantShowcase = ({ participant }) => (
	<div>
		<div>Name: {participant.name}</div>
		<div>Contribution: {participant.contribution}</div>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: queries.entityData(state, EntityType.participant, participantId) 
});

export default connect(mapStateToProps)(ParticipantShowcase);
