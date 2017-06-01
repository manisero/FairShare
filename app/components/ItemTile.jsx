import React from 'react'
import { connect } from 'reactReduxUtils'

let defaultNameStyle = {};

let selectedNameStyle = {
	fontWeight: 'bold'
};

let ItemTile = ({ item, isSelected, onClick }) => (
	<div onClick={() => onClick()}>
		<div>Name: <span style={isSelected ? selectedNameStyle : defaultNameStyle}>{item.name}</span></div>
		<div>Price: {item.price}</div>
	</div>
);

let mapStateToProps = (state, { itemId }) => ({
	item: state.data.items.items[itemId],
	isSelected: itemId === state.ui.selectedItemId 
});

let mapEventsToProps = (events, { itemId }) => ({
	onClick: () => events.itemSelected(itemId)
});

export default connect(mapStateToProps, mapEventsToProps)(ItemTile);
