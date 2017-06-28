import React from 'react'
import { connect } from 'reactReduxUtils'
import { Right } from 'compUtils'
import { Button, ButtonGroup, TextBox, NumberBox } from 'inputs'

let ParticipantEditor = ({ participant, onNameChange, onContributionChange, onSubmitClick, onCancelClick }) => (
	<div>
		<TextBox value={participant.name} label='Name' onChange={e => onNameChange(e.target.value)} />
		<NumberBox value={participant.contribution} label='Contribution' onChange={e => onContributionChange(e.target.value)} />
		<Right>
			<ButtonGroup>
				<Button onClick={onSubmitClick}>Submit</Button>
				<Button onClick={onCancelClick}>Cancel</Button>
			</ButtonGroup>
		</Right>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.ui.editedParticipant[participantId]
});

let mapEventsToProps = (events, { participantId }) => ({
	onNameChange: name => events.participantEdited(participantId, { name: { $set: name } }),
	onContributionChange: contribution => events.participantEdited(participantId, { contribution: { $set: contribution } }),
	onSubmitClick: () => events.participantEditingSubmitted(participantId),
	onCancelClick: () => events.participantEditingCancelled(participantId)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantEditor);
