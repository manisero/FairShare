import React from 'react'
import { connect } from 'reactReduxUtils'
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
	onNameChange: name => events.participantEditUpdated(participantId, { name: { $set: name } }),
	onContributionChange: contribution => events.participantEditUpdated(participantId, { contribution: { $set: contribution } }),
	onSubmitClick: () => events.participantEditSubmitted(participantId),
	onCancelClick: () => events.participantEditCancelled(participantId)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantEditor);
