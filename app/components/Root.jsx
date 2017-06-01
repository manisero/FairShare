import React from 'react'
import { connect } from 'reactReduxUtils'
import ParticipantTile from './ParticipantTile.jsx'
import ParticipantEditor from './ParticipantEditor.jsx'
import ItemTile from './ItemTile.jsx'
import ItemEditor from './ItemEditor.jsx'

let getEditor = (selectedParticipantId, selectedItemId) => {
	if (selectedParticipantId != null) {
		return (<ParticipantEditor participantId={selectedParticipantId} />);
	} else if (selectedItemId != null) {
		return (<ItemEditor itemId={selectedItemId} />);
	} else {
		return null;
	}
};

let Root = ({ participantIds, itemIds, selectedParticipantId, selectedItemId }) => {
	let participantTiles = participantIds.map(id => (<ParticipantTile key={id} participantId={id} />));
	let itemTiles = itemIds.map(id => (<ItemTile key={id} itemId={id} />));
	let editor = getEditor(selectedParticipantId, selectedItemId);

	return (
		<div>
			<div>{participantTiles}</div>
			<div>{itemTiles}</div>
			{editor}
		</div>
	);
};

let mapStateToProps = (state) => ({
    participantIds: state.data.participants.ids,
	itemIds: state.data.items.ids,
	selectedParticipantId: state.ui.selectedParticipantId,
	selectedItemId: state.ui.selectedItemId
});

export default connect(mapStateToProps)(Root);
