import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType, FocusMode } from 'model'
import queries from 'queries'
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
	focusMode: queries.focus(state, EntityType.participant).itemId === participantId ? queries.focus(state, EntityType.participant).mode : FocusMode.noFocus,
	showcaseFactory: () => <ParticipantShowcase participantId={participantId} />,
	detailsFactory: () => <ParticipantDetails participantId={participantId} />,
	editorFactory: () => <ParticipantEditor participantId={participantId} />,
	deletorFactory: () => <ParticipantDeletor participantId={participantId} />
});

let ParticipantTile = connect(participantMapStateToProps)(Tile); 

// Item

let itemMapStateToProps = (state, { itemId }) => ({
	focusMode: queries.focus(state, EntityType.item).itemId === itemId ? queries.focus(state, EntityType.item).mode : FocusMode.noFocus,
	showcaseFactory: () => <ItemShowcase itemId={itemId} />,
	detailsFactory: () => <ItemDetails itemId={itemId} />,
	editorFactory: () => <ItemEditor itemId={itemId} />,
	deletorFactory: () => <ItemDeletor itemId={itemId} />
});

let ItemTile = connect(itemMapStateToProps)(Tile); 

export { ParticipantTile, ItemTile };
