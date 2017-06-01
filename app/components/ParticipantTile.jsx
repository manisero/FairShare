import React from 'react'
import { connect } from 'reactReduxUtils'

let defaultNameStyle = {};

let selectedNameStyle = {
	fontWeight: 'bold'
};

let ParticipantTile = ({ participant, isSelected, onClick }) => (
	<div onClick={() => onClick()}>
		<div>Name: <span style={isSelected ? selectedNameStyle : defaultNameStyle}>{participant.name}</span></div>
		<div>Contribution: {participant.contribution}</div>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.data.participants.items[participantId],
	isSelected: participantId === state.ui.selectedParticipantId 
});

let mapEventsToProps = (events, { participantId }) => ({
	onClick: () => events.participantSelected(participantId)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantTile);
