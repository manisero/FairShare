import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import { Right } from 'compUtils'
import { Button, ButtonGroup } from 'inputs'

let ItemDetails = ({ item, onEditClick, onDeleteClick, onCancelClick }) => (
	<div>
		<div>Name: {item.name}</div>
		<div>Price: {item.price}</div>
		<Right>
			<ButtonGroup>
				<Button onClick={onEditClick}>Edit</Button>
				<Button onClick={onDeleteClick}>Delete</Button>
				<Button onClick={onCancelClick}>Cancel</Button>
			</ButtonGroup>
		</Right>
	</div>
);

let mapStateToProps = (state, { itemId }) => ({
	item: state.data.item.items[itemId] 
});

let mapEventsToProps = (events, { itemId }) => ({
	onEditClick: () => events.entityEdit_Started(EntityType.item, itemId),
	onDeleteClick: () => events.entityDelete_Started(EntityType.item, itemId),
	onCancelClick: () => events.entityDeselected(EntityType.item)
});

export default connect(mapStateToProps, mapEventsToProps)(ItemDetails);
