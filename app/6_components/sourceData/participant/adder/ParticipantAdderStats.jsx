import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'

let ParticipantAdderStats = ({ participantsCount, toAddCount }) => (
	<ul className='list-inline text-info'>
		<li>#: {participantsCount} + {toAddCount}</li>
	</ul>
);

let mapStateToProps = state => ({
	participantsCount: queries.entityCount(state, EntityType.participant),
    toAddCount:
        queries.toAdd_addedCount(state, EntityType.participant) +
        (queries.toAdd_next(state, EntityType.participant).name != '' ? 1 : 0)
});

export default connect(mapStateToProps)(ParticipantAdderStats);
