import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Right } from 'compUtils'
import { Button, ButtonGroup } from 'inputs'

let ParticipantDetails = ({ participant, onEditClick, onDeleteClick, onCancelClick }) => (
	<div>
		<div>Name: {participant.name}</div>
		<div>Contribution: {participant.contribution}</div>
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
	onEditClick: () => events.entityEdit_Started(EntityType.participant, participantId),
	onDeleteClick: () => events.entityDelete_Started(EntityType.participant, participantId),
	onCancelClick: () => events.entityDeselected(EntityType.participant)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantDetails);
