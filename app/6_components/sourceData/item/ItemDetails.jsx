import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Money, Right } from 'compUtils'
import { Button, ButtonGroup } from 'inputs'
import ParticipationsDetails from '../participation/ParticipationsDetails.jsx'

let ItemDetails = ({ itemId, item, onEditClick, onDeleteClick, onCancelClick }) => (
	<div>
		<div>Name: {item.name}</div>
		<div>Price: <Money amount={item.price} /></div>
		<ParticipationsDetails itemId={itemId} />
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
	item: queries.entityData(state, EntityType.item, itemId) 
});

let mapEventsToProps = (events, { itemId }) => ({
	onEditClick: () => events.itemEdit_Started(itemId),
	onDeleteClick: () => events.itemDelete_Started(itemId),
	onCancelClick: () => events.itemDeselected()
});

export default connect(mapStateToProps, mapEventsToProps)(ItemDetails);
