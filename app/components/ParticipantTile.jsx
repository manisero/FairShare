import React from 'react'
import { connect } from 'reactReduxUtils'
import { FocusMode } from 'model'

let defaultNameStyle = {};

let selectedNameStyle = {
	fontWeight: 'bold'
};

let ParticipantTile = ({ participant, focusMode }) => (
	<div>
		<div>Name: <span style={focusMode === FocusMode.selected ? selectedNameStyle : defaultNameStyle}>{participant.name}</span></div>
		<div>Contribution: {participant.contribution}</div>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.data.participants.items[participantId],
	focusMode: state.ui.participantFocus.itemId === participantId ? state.ui.participantFocus.mode : FocusMode.noFocus 
});

export default connect(mapStateToProps)(ParticipantTile);
