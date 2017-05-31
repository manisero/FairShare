import React from 'react'
import { connect } from 'reactReduxUtils'
import ParticipantTile from './ParticipantTile.jsx'

let Root = ({ participantIds }) => {
	let participantTiles = participantIds.map(id => (<ParticipantTile key={id} participantId={id} />));

	return (
		<div>
			{participantTiles}
		</div>
	);
};

let mapStateToProps = (state) => ({
    participantIds: state.data.participants.ids
});

export default connect(mapStateToProps)(Root);
