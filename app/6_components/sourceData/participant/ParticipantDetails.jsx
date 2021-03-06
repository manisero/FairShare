import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Money, Right } from 'compUtils'
import { Button, ButtonGroup } from 'inputs'

let ParticipantDetails = ({ participant, onEditClick, onDeleteClick, onCancelClick }) => (
	<div>
		<div>Name: {participant.name}</div>
		<div className='hidden'>Contribution: <Money amount={participant.contribution} /></div>
		<Right>
			<ButtonGroup>
				<Button onClick={onEditClick}>Edit</Button>
				<Button onClick={onDeleteClick}>Delete</Button>
				<Button onClick={onCancelClick}>Cancel</Button>
			</ButtonGroup>
		</Right>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: queries.entityData(state, EntityType.participant, participantId)
});

let mapEventsToProps = (events, { participantId }) => ({
	onEditClick: () => events.participantEdit_Started(participantId),
	onDeleteClick: () => events.participantDelete_Requested(participantId),
	onCancelClick: () => events.participantDeselected()
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantDetails);
