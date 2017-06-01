import React from 'react'
import { connect } from 'reactReduxUtils'
import ParticipantTile from './ParticipantTile.jsx'
import ParticipantEditor from './ParticipantEditor.jsx'

let Root = ({ participantIds, selectedParticipantId }) => {
	let participantTiles = participantIds.map(id => (<ParticipantTile key={id} participantId={id} />));

	return (
		<div>
			{participantTiles}
			<ParticipantEditor participantId={selectedParticipantId} />
		</div>
	);
};

let mapStateToProps = (state) => ({
    participantIds: state.data.participants.ids,
	selectedParticipantId: state.ui.selectedParticipantId
});

export default connect(mapStateToProps)(Root);
