import React from 'react'
import { connect } from 'reactReduxUtils'
import { Right } from 'compUtils'
import { Button, ButtonGroup, TextBox, NumberBox } from 'inputs'

let ItemEditor = ({ item, onNameChange, onPriceChange, onSubmitClick, onCancelClick }) => (
	<div>
		<TextBox value={item.name} label='Name' onChange={x => onNameChange(x)} />
		<NumberBox value={item.price} label='Price' onChange={x => onPriceChange(x)} />
		<Right>
			<ButtonGroup>
				<Button onClick={onSubmitClick}>Submit</Button>
				<Button onClick={onCancelClick}>Cancel</Button>
			</ButtonGroup>
		</Right>
	</div>
);

let mapStateToProps = (state, { itemId }) => ({
	item: state.ui.item.edit[itemId]
});

let mapEventsToProps = (events, { itemId }) => ({
	onNameChange: name => events.itemEditUpdated(itemId, { name: { $set: name } }),
	onPriceChange: price => events.itemEditUpdated(itemId, { price: { $set: price } }),
	onSubmitClick: () => events.itemEditSubmitted(itemId),
	onCancelClick: () => events.itemEditCancelled(itemId)
});

export default connect(mapStateToProps, mapEventsToProps)(ItemEditor);
