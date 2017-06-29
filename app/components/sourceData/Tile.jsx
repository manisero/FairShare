import React from 'react'
import { connect } from 'reactReduxUtils'
import { FocusMode } from 'model'
import ParticipantShowcase from './ParticipantShowcase.jsx'
import ParticipantDetails from './ParticipantDetails.jsx'
import ParticipantEditor from './ParticipantEditor.jsx'
import { ParticipantDeletor } from './Deletor.jsx'

let ParticipantTile = ({ participantId, focusMode }) => {
	switch (focusMode) {
	case FocusMode.noFocus:
		return <ParticipantShowcase participantId={participantId} />;
	case FocusMode.selected:
		return <ParticipantDetails participantId={participantId} />;
	case FocusMode.edited:
		return <ParticipantEditor participantId={participantId} />;
	case FocusMode.deleted:
		return <ParticipantDeletor participantId={participantId} />;
	default:
		return null;
	}
};

let mapStateToProps = (state, { participantId }) => ({
	focusMode: state.ui.participant.focus.itemId === participantId ? state.ui.participant.focus.mode : FocusMode.noFocus 
});

export default connect(mapStateToProps)(ParticipantTile);
