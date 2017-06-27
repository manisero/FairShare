import React from 'react'
import { connect } from 'reactReduxUtils'
import { Button, TextBox, NumberBox } from 'inputs'

let ParticipantEditor = ({ participant, onNameChange, onContributionChange }) => (
	<div>
		<TextBox value={participant.name} label='Name' onChange={e => onNameChange(e.target.value)} />
		<NumberBox value={participant.contribution} label='Contribution' onChange={e => onContributionChange(e.target.value)} />
		<Button>OK</Button>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.data.participants.items[participantId]
});

let mapEventsToProps = (events, { participantId }) => ({
	onNameChange: name => events.participantEdited(participantId, { name: { $set: name } }),
	onContributionChange: contribution => events.participantEdited(participantId, { contribution: { $set: contribution } })
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantEditor);
