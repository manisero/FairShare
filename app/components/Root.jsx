import React from 'react'
import { connect } from 'reactReduxUtils'
import { ParticipantList, ItemList } from './List.jsx'
import ItemEditor from './item/Editor.jsx'

let getEditor = (selectedItemId) => {
	if (selectedItemId != null) {
		return (<ItemEditor itemId={selectedItemId} />);
	} else {
		return null;
	}
};

let Root = ({ selectedItemId }) => {
	let editor = getEditor(selectedItemId);

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
	selectedItemId: state.ui.selectedItemId
});

export default connect(mapStateToProps)(Root);
