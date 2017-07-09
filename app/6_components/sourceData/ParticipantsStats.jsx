import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'

let ParticipantsStats = ({ participantsCount }) => (
	<ul className='list-inline text-info'>
		<li>#: {participantsCount}</li>
	</ul>
);

let mapStateToProps = state => ({
	participantsCount: queries.entityCount(state, EntityType.participant) 
});

export default connect(mapStateToProps)(ParticipantsStats);
