import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import { Right } from 'compUtils'
import { Button, ButtonGroup, TextBox, NumberBox } from 'inputs'

let ParticipantEditor = ({ participant, onNameChange, onContributionChange, onSubmitClick, onCancelClick }) => (
	<div>
		<TextBox value={participant.name} label='Name' onChange={x => onNameChange(x)} />
		<NumberBox value={participant.contribution} label='Contribution' onChange={x => onContributionChange(x)} />
		<Right>
			<ButtonGroup>
				<Button onClick={onSubmitClick}>Submit</Button>
				<Button onClick={onCancelClick}>Cancel</Button>
			</ButtonGroup>
		</Right>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.ui.participant.edit[participantId]
});

let mapEventsToProps = (events, { participantId }) => ({
	onNameChange: name => events.entityEdit_Updated(EntityType.participant, participantId, { name: { $set: name } }),
	onContributionChange: contribution => events.entityEdit_Updated(EntityType.participant, participantId, { contribution: { $set: contribution } }),
	onSubmitClick: () => events.entityEdit_Submitted(EntityType.participant, participantId),
	onCancelClick: () => events.entityEdit_Cancelled(EntityType.participant, participantId)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantEditor);
