import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Right } from 'compUtils'
import { Button } from 'inputs'

let ParticipantDeleteRejector = ({ participantId, participant, itemsHeIsInvolvedIn, onOkClick }) => {
	let itemItems = itemsHeIsInvolvedIn.map((x, i) => <li key={i}>{x.name}</li>);

	return (
		<div>
			<div>You cannot delete <b>{participant.name}</b> as it contributed to or participates in some items:</div>
			<ul>
                {itemItems}
            </ul>
			<div>Remove <b>{participant.name}</b> from those items first.</div>
			<Right>
				<Button onClick={onOkClick}>OK</Button>
			</Right>
		</div>
	);
};

let mapStateToProps = (state, { participantId }) => ({
	participant: queries.entityData(state, EntityType.participant, participantId),
	itemsHeIsInvolvedIn: queries.itemsParticipantIsInvolvedIn(state, participantId)
});

let mapEventsToProps = (events, { participantId }) => ({
	onOkClick: () => events.participantDelete_Cancelled(participantId)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantDeleteRejector);
