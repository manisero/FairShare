import React from 'react'
import { ifNull } from 'jsUtils'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Right } from 'compUtils'
import { Button, ButtonGroup, Checkbox, TextBox, NumberBox } from 'inputs'

let ParticipantsEditor = ({ participantIds, participants, checkedParticipantIds, onParticipantCheckChange }) => {
	let participantCheckboxes = participantIds.map(x => {
		let name = participants[x].name;
		let isChecked = checkedParticipantIds.includes(x);

		return (
			<div key={x}>
				<Checkbox checked={isChecked} label={name} onChange={val => onParticipantCheckChange(x, val)} />
			</div>
		);
	});

	return (
		<div>
			Participants:
			<div>{participantCheckboxes}</div>
		</div>
	);
};

ParticipantsEditor = connect(
	(state, { itemId }) => ({
		participantIds: queries.entityIds(state, EntityType.participant),
		participants: queries.entityAllData(state, EntityType.participant),
		checkedParticipantIds: [ 1 ]
	}),
	(events, { itemId }) => ({
		onParticipantCheckChange: (participantId, isChecked) => alert('' + participantId + ' ' + isChecked)
	})
)(ParticipantsEditor);

let ItemEditor = ({ itemId, item, error, onNameChange, onPriceChange, onSubmitClick, onCancelClick }) => (
	<div>
		<TextBox label='Name' value={item.name} error={error.name} onChange={x => onNameChange(x)} />
		<NumberBox label='Price' value={item.price} error={error.price} onChange={x => onPriceChange(x)} />
		<ParticipantsEditor itemId={itemId} />
		<Right>
			<ButtonGroup>
				<Button onClick={onSubmitClick}>Submit</Button>
				<Button onClick={onCancelClick}>Cancel</Button>
			</ButtonGroup>
		</Right>
	</div>
);

let mapStateToProps = (state, { itemId }) => ({
	item: queries.edit(state, EntityType.item, itemId).data,
	error: ifNull(queries.edit(state, EntityType.item, itemId).error, () => ({}))
});

let mapEventsToProps = (events, { itemId }) => ({
	onNameChange: name => events.entityEdit_Updated(EntityType.item, itemId, { name: { $set: name } }),
	onPriceChange: price => events.entityEdit_Updated(EntityType.item, itemId, { price: { $set: price } }),
	onSubmitClick: () => events.entityEdit_Submitted(EntityType.item, itemId),
	onCancelClick: () => events.entityEdit_Cancelled(EntityType.item, itemId)
});

export default connect(mapStateToProps, mapEventsToProps)(ItemEditor);
