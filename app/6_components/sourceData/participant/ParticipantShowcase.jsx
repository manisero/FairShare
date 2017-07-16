import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'

let ParticipantShowcase = ({ participant }) => (
	<div>
		<div>{participant.name}</div>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: queries.entityData(state, EntityType.participant, participantId) 
});

export default connect(mapStateToProps)(ParticipantShowcase);
