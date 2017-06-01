import React from 'react'
import { connect } from 'reactReduxUtils'
import ParticipantTile from './ParticipantTile.jsx'
import ParticipantEditor from './ParticipantEditor.jsx'

let Root = ({ participantIds }) => {
	let participantTiles = participantIds.map(id => (<ParticipantTile key={id} participantId={id} />));

	return (
		<div>
			{participantTiles}
			<ParticipantEditor participantId={participantIds[0]} />
		</div>
	);
};

let mapStateToProps = (state) => ({
    participantIds: state.data.participants.ids
});

export default connect(mapStateToProps)(Root);
