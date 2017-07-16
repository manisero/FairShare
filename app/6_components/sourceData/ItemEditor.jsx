import React from 'react'
import { safeGet } from 'jsUtils'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Right } from 'compUtils'
import { Button, ButtonGroup, TextBox, NumberBox } from 'inputs'
import { ParticipationsEditor } from './ParticipationsEditor.jsx'

let ItemEditor = ({ itemId, item, error, submitEnabled, onNameChange, onPriceChange, onSubmitClick, onCancelClick }) => (
	<div>
		<div className='form-horizontal'>
			<TextBox label='Name' valueString={item.name} error={safeGet(error, 'name')} onChange={x => onNameChange(x)} />
			<NumberBox label='Price' valueString={item.price_string} initialValue={item.price} error={safeGet(error, 'price')} onChange={x => onPriceChange(x)} />
		</div>
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
	let participationsError = queries.edit(state, EntityType.participation, itemId).error;

	return {
		item: data,
		error: error,
		submitEnabled: error == null && participationsError == null
	}
};

let mapEventsToProps = (events, { itemId }) => ({
	onNameChange: name => events.itemEdit_Updated(itemId, { name: { $set: name } }),
	onPriceChange: price => events.itemEdit_Updated(itemId, {
		price: { $set: price.value },
		price_string: { $set: price.valueString }
	}),
	onSubmitClick: () => events.itemEdit_Submitted(itemId),
	onCancelClick: () => events.itemEdit_Cancelled(itemId)
});

export default connect(mapStateToProps, mapEventsToProps)(ItemEditor);
