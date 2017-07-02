import React from 'react'
import { connect } from 'reactReduxUtils'
import { FocusMode } from 'model'
import ItemShowcase from './ItemShowcase.jsx'
import ItemDetails from './ItemDetails.jsx'
import ItemEditor from './ItemEditor.jsx'
import ParticipantShowcase from './ParticipantShowcase.jsx'
import ParticipantDetails from './ParticipantDetails.jsx'
import ParticipantEditor from './ParticipantEditor.jsx'
import { ParticipantDeletor, ItemDeletor } from './Deletor.jsx'

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

// Item

let itemMapStateToProps = (state, { itemId }) => ({
	focusMode: state.ui.item.focus.itemId === itemId ? state.ui.item.focus.mode : FocusMode.noFocus,
	showcaseFactory: () => <ItemShowcase itemId={itemId} />,
	detailsFactory: () => <ItemDetails itemId={itemId} />,
	editorFactory: () => <ItemEditor itemId={itemId} />,
	deletorFactory: () => <ItemDeletor itemId={itemId} />
});

let ItemTile = connect(itemMapStateToProps)(Tile); 

export { ParticipantTile, ItemTile };
