import React from 'react'
import { connect } from 'reactReduxUtils'
import { FocusMode } from 'model'
import ParticipantShowcase from './ParticipantShowcase.jsx'
import ParticipantDetails from './ParticipantDetails.jsx'
import ParticipantEditor from './ParticipantEditor.jsx'
import { ParticipantDeletor } from './Deletor.jsx'

let Tile = ({ focusMode, showcaseFactory, detailsFactory, editorFactory, deletorFactory }) => {
	switch (focusMode) {
	case FocusMode.noFocus:
		return showcaseFactory();
	case FocusMode.selected:
		return detailsFactory();
	case FocusMode.edited:
		return editorFactory();
	case FocusMode.deleted:
		return deletorFactory();
	default:
		return null;
	}
};

// Participant

let participantMapStateToProps = (state, { participantId }) => ({
	focusMode: state.ui.participant.focus.itemId === participantId ? state.ui.participant.focus.mode : FocusMode.noFocus,
	showcaseFactory: () => <ParticipantShowcase participantId={participantId} />,
	detailsFactory: () => <ParticipantDetails participantId={participantId} />,
	editorFactory: () => <ParticipantEditor participantId={participantId} />,
	deletorFactory: () => <ParticipantDeletor participantId={participantId} />
});

let ParticipantTile = connect(participantMapStateToProps)(Tile); 

export { ParticipantTile };
