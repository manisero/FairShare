import React from 'react'
import { connect } from 'reactReduxUtils'
import { FocusMode } from 'model'
import Showcase from './Showcase.jsx'
import Details from './Details.jsx'
import Editor from './Editor.jsx'

let ParticipantTile = ({ participantId, focusMode }) => {
	switch (focusMode) {
	case FocusMode.noFocus:
		return <Showcase participantId={participantId} />;
	case FocusMode.selected:
		return <Details participantId={participantId} />;
	case FocusMode.edited:
		return <Editor participantId={participantId} />;
	default:
		return null;
	}
};

let mapStateToProps = (state, { participantId }) => ({
	focusMode: state.ui.participantFocus.itemId === participantId ? state.ui.participantFocus.mode : FocusMode.noFocus 
});

export default connect(mapStateToProps)(ParticipantTile);
