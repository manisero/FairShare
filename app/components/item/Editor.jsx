import React from 'react'
import { connect } from 'reactReduxUtils'
import { Button, TextBox, NumberBox } from 'inputs'

let ItemEditor = ({ item, onNameChange, onPriceChange }) => (
	<div>
		<TextBox value={item.name} label='Name' onChange={e => onNameChange(e.target.value)} />
		<NumberBox value={item.price} label='Price' onChange={e => onPriceChange(e.target.value)} />
		<Button>OK</Button>
	</div>
);

let mapStateToProps = (state, { itemId }) => ({
	item: state.data.items.items[itemId]
});

let mapEventsToProps = (events, { itemId }) => ({
	onNameChange: name => events.itemEdited(itemId, { name: { $set: name } }),
	onPriceChange: price => events.itemEdited(itemId, { price: { $set: price } })
});

export default connect(mapStateToProps, mapEventsToProps)(ItemEditor);
