import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'

let ParticipantsStats = ({ participantsCount }) => (
	<div>
        #: {participantsCount}
	</div>
);

let mapStateToProps = state => ({
	participantsCount: queries.entityCount(state, EntityType.participant) 
});

export default connect(mapStateToProps)(ParticipantsStats);
