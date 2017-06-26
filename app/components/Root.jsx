import React from 'react'
import { connect } from 'reactReduxUtils'
import { ParticipantList, ItemList } from './List.jsx'
import ParticipantEditor from './ParticipantEditor.jsx'
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

let Root = ({ selectedParticipantId, selectedItemId }) => {
	let editor = getEditor(selectedParticipantId, selectedItemId);

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-xs-4'><ParticipantList /></div>
				<div className='col-xs-4'><ItemList /></div>
				<div className='col-xs-4'>{editor}</div>
			</div>
		</div>
	);
};

let mapStateToProps = state => ({
	selectedParticipantId: state.ui.selectedParticipantId,
	selectedItemId: state.ui.selectedItemId
});

export default connect(mapStateToProps)(Root);
