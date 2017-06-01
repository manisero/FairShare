import React from 'react'
import { connect } from 'reactReduxUtils'
import TextBox from './inputs/TextBox.jsx'
import NumberBox from './inputs/NumberBox.jsx'
import Button from './inputs/Button.jsx'

let ParticipantEditor = ({ participant, onNameChange }) => (
	<div>
		<div>Name: <TextBox value={participant.name} onChange={e => onNameChange(e.target.value)} /></div>
		<div>Contribution: <NumberBox value={participant.contribution} /></div>
		<Button value='OK' />
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.data.participants.items[participantId]
});

let mapEventsToProps = (events, { participantId }) => ({
	onNameChange: name => events.participantNameEdited(participantId, name)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantEditor);
