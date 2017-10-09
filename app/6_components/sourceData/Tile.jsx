import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType, FocusMode } from 'model'
import queries from 'queries'
import ItemShowcase from './item/ItemShowcase.jsx'
import ItemDetails from './item/ItemDetails.jsx'
import { ItemEditor } from './item/ItemEditor.jsx'
import ParticipantShowcase from './participant/ParticipantShowcase.jsx'
import ParticipantDetails from './participant/ParticipantDetails.jsx'
import ParticipantEditor from './participant/ParticipantEditor.jsx'
import ParticipantDeleteRejector from './participant/ParticipantDeleteRejector.jsx'
import { ParticipantDeletor, ItemDeletor } from './Deletor.jsx'

let Tile = ({ entityId, focusMode, showcaseFactory, detailsFactory, editorFactory, deletorFactory, deleteRejectorFactory }) => {
	switch (focusMode) {
	case FocusMode.noFocus:
		return showcaseFactory(entityId);
	case FocusMode.selected:
		return detailsFactory(entityId);
	case FocusMode.edited:
		return editorFactory(entityId);
	case FocusMode.deleted:
		return deletorFactory(entityId);
	case FocusMode.deleteRejected:
		return deleteRejectorFactory(entityId);
	default:
		return null;
	}
};

// Participant

let participantFactories = {
	showcase: id => <ParticipantShowcase participantId={id} />,
	details: id => <ParticipantDetails participantId={id} />,
	editor: id => <ParticipantEditor participantId={id} />,
	deletor: id => <ParticipantDeletor participantId={id} />,
	deleteRejector: id => <ParticipantDeleteRejector participantId={id} />
};

let participantMapStateToProps = (state, { participantId }) => {
	let { mode: focusMode, itemId: focusedId } = queries.focus(state, EntityType.participant);

	return {
		entityId: participantId,
		focusMode: focusedId === participantId ? focusMode : FocusMode.noFocus,
		showcaseFactory: participantFactories.showcase,
		detailsFactory: participantFactories.details,
		editorFactory: participantFactories.editor,
		deletorFactory: participantFactories.deletor,
		deleteRejectorFactory: participantFactories.deleteRejector
	}
};

let ParticipantTile = connect(participantMapStateToProps)(Tile); 

// Item

let itemFactories = {
	showcase: id => <ItemShowcase itemId={id} />,
	details: id => <ItemDetails itemId={id} />,
	editor: id => <ItemEditor itemId={id} />,
	deletor: id => <ItemDeletor itemId={id} />
};

let itemMapStateToProps = (state, { itemId }) => {
	let { mode: focusMode, itemId: focusedId } = queries.focus(state, EntityType.item);

	return {
		entityId: itemId,
		focusMode: focusedId === itemId ? focusMode : FocusMode.noFocus,
		showcaseFactory: itemFactories.showcase,
		detailsFactory: itemFactories.details,
		editorFactory: itemFactories.editor,
		deletorFactory: itemFactories.deletor
	}
};

let ItemTile = connect(itemMapStateToProps)(Tile); 

export { ParticipantTile, ItemTile };
