import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Money } from 'compUtils'

let ParticipantShowcase = ({ participant }) => (
	<div>
		<div>Name: {participant.name}</div>
		<div>Contribution: <Money amount={participant.contribution} /></div>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: queries.entityData(state, EntityType.participant, participantId) 
});

export default connect(mapStateToProps)(ParticipantShowcase);
