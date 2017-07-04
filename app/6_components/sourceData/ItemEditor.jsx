import React from 'react'
import { ifNull } from 'jsUtils'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Right } from 'compUtils'
import { Button, ButtonGroup, TextBox, NumberBox } from 'inputs'
import ParticipationsEditor from './ParticipationsEditor.jsx'

let ItemEditor = ({ itemId, item, error, submitEnabled, onNameChange, onPriceChange, onSubmitClick, onCancelClick }) => (
	<div>
		<TextBox label='Name' value={item.name} error={error.name} onChange={x => onNameChange(x)} />
		<NumberBox label='Price' value={item.price} error={error.price} onChange={x => onPriceChange(x)} />
		<ParticipationsEditor itemId={itemId} />
		<Right>
			<ButtonGroup>
				<Button onClick={onSubmitClick} disabled={!submitEnabled}>Submit</Button>
				<Button onClick={onCancelClick}>Cancel</Button>
			</ButtonGroup>
		</Right>
	</div>
);

let mapStateToProps = (state, { itemId }) => {
	let { data, error } = queries.edit(state, EntityType.item, itemId);

	return {
		item: data,
		error: ifNull(error, () => ({})),
		submitEnabled: error == null
	}
};

let mapEventsToProps = (events, { itemId }) => ({
	onNameChange: name => events.itemEdit_Updated(itemId, { name: { $set: name } }),
	onPriceChange: price => events.itemEdit_Updated(itemId, { price: { $set: price } }),
	onSubmitClick: () => events.itemEdit_Submitted(itemId),
	onCancelClick: () => events.itemEdit_Cancelled(itemId)
});

export default connect(mapStateToProps, mapEventsToProps)(ItemEditor);
