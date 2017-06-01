import React from 'react'
import { connect } from 'reactReduxUtils'
import TextBox from './inputs/TextBox.jsx'
import NumberBox from './inputs/NumberBox.jsx'
import Button from './inputs/Button.jsx'

let ParticipantEditor = participant => (
	<div>
		<div>Name: <TextBox defaultValue={participant.name} /></div>
		<div>Contribution: <NumberBox defaultValue={participant.contribution} /></div>
		<Button value='OK' />
	</div>
);

let mapStateToProps = (state, { participantId }) => state.data.participants.items[participantId];

export default connect(mapStateToProps)(ParticipantEditor);
