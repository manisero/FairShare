import React from 'react'
import { ifNull } from 'jsUtils'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Center, Right } from 'compUtils'
import { Button, ButtonGroup, Checkbox, TextBox, NumberBox } from 'inputs'

let ContributionsEditor = ({ participantIds, participants, contributions, onContributionChange, onParticipatesChange }) => {
	let rows = participantIds.map(id => {
		let { contribution, participates } = ifNull(contributions.find(x => x.participantId === id), () => ({}));

		return (
			<tr key={id}>
				<td>{participants[id].name}</td>
				<td>
					<NumberBox value={contribution} noMargin onChange={val => onContributionChange(id, val)} />
				</td>
				<td>
					<Center>
						<Checkbox checked={participates} onChange={val => onParticipatesChange(id, val)} />
					</Center>
				</td>
			</tr>
		);
	});

	return (
		<table className="table table-striped table-condensed">
			<thead>
				<tr>
					<th className='col-xs-6'>Participants</th>
					<th className='col-xs-4'>Paid</th>
					<th className='col-xs-2'>Ate</th>
				</tr>
			</thead>
			<tbody>
				{rows}
			</tbody>
		</table>
	);
};

ContributionsEditor = connect(
	(state, { itemId }) => ({
		participantIds: queries.entityIds(state, EntityType.participant),
		participants: queries.entityAllData(state, EntityType.participant),
		contributions: queries.itemContributions(state, itemId)
	}),
	(events, { itemId }) => ({
		onParticipatesChange: (participantId, isChecked) => alert('' + participantId + ' ' + isChecked)
	})
)(ContributionsEditor);

let ItemEditor = ({ itemId, item, error, submitEnabled, onNameChange, onPriceChange, onSubmitClick, onCancelClick }) => (
	<div>
		<TextBox label='Name' value={item.name} error={error.name} onChange={x => onNameChange(x)} />
		<NumberBox label='Price' value={item.price} error={error.price} onChange={x => onPriceChange(x)} />
		<ContributionsEditor itemId={itemId} />
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
	onNameChange: name => events.entityEdit_Updated(EntityType.item, itemId, { name: { $set: name } }),
	onPriceChange: price => events.entityEdit_Updated(EntityType.item, itemId, { price: { $set: price } }),
	onSubmitClick: () => events.entityEdit_Submitted(EntityType.item, itemId),
	onCancelClick: () => events.entityEdit_Cancelled(EntityType.item, itemId)
});

export default connect(mapStateToProps, mapEventsToProps)(ItemEditor);
