import React from 'react'
import { ifNull } from 'jsUtils'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import { Right } from 'compUtils'
import { Button, ButtonGroup, TextBox, NumberBox } from 'inputs'

let ParticipantEditor = ({ participant, error, onNameChange, onContributionChange, onSubmitClick, onCancelClick }) => (
	<div>
		<TextBox label='Name' value={participant.name} error={error.name} onChange={x => onNameChange(x)} />
		<NumberBox label='Contribution' value={participant.contribution} error={error.contribution} onChange={x => onContributionChange(x)} />
		<Right>
			<ButtonGroup>
				<Button onClick={onSubmitClick}>Submit</Button>
				<Button onClick={onCancelClick}>Cancel</Button>
			</ButtonGroup>
		</Right>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.ui.participant.edit[participantId].data,
	error: ifNull(state.ui.participant.edit[participantId].error, () => ({}))
});

let mapEventsToProps = (events, { participantId }) => ({
	onNameChange: name => events.entityEdit_Updated(EntityType.participant, participantId, { name: { $set: name } }),
	onContributionChange: contribution => events.entityEdit_Updated(EntityType.participant, participantId, { contribution: { $set: contribution } }),
	onSubmitClick: () => events.entityEdit_Submitted(EntityType.participant, participantId),
	onCancelClick: () => events.entityEdit_Cancelled(EntityType.participant, participantId)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantEditor);
