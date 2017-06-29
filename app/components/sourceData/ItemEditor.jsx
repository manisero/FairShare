import React from 'react'
import { connect } from 'reactReduxUtils'
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
		participantIds: state.data.participant.ids,
		participants: state.data.participant.items,
		checkedParticipantIds: [ 1 ]
	}),
	(events, { itemId }) => ({
		onParticipantCheckChange: (participantId, isChecked) => alert('' + participantId + ' ' + isChecked)
	})
)(ParticipantsEditor);

let ItemEditor = ({ itemId, item, onNameChange, onPriceChange, onSubmitClick, onCancelClick }) => (
	<div>
		<TextBox value={item.name} label='Name' onChange={x => onNameChange(x)} />
		<NumberBox value={item.price} label='Price' onChange={x => onPriceChange(x)} />
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
	item: state.ui.item.edit[itemId]
});

let mapEventsToProps = (events, { itemId }) => ({
	onNameChange: name => events.itemEditUpdated(itemId, { name: { $set: name } }),
	onPriceChange: price => events.itemEditUpdated(itemId, { price: { $set: price } }),
	onSubmitClick: () => events.itemEditSubmitted(itemId),
	onCancelClick: () => events.itemEditCancelled(itemId)
});

export default connect(mapStateToProps, mapEventsToProps)(ItemEditor);
