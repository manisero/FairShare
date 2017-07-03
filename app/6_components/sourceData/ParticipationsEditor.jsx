import React from 'react'
import { mapObjectFields } from 'jsUtils'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Center } from 'compUtils'
import { Checkbox, NumberBox } from 'inputs'

let ParticipationsEditor = ({ participations, participants, onContributionChange, onParticipatesChange }) => {
	let participationEditors = mapObjectFields(
		participations,
		({ contribution, participates }, participantId) => (
			<tr key={participantId}>
				<td>{participants[participantId].name}</td>
				<td>
					<NumberBox value={contribution} noMargin onChange={val => onContributionChange(participantId, val)} />
				</td>
				<td>
					<Center>
						<Checkbox checked={participates} onChange={val => onParticipatesChange(participantId, val)} />
					</Center>
				</td>
			</tr>
		)
	);

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
				{participationEditors}
			</tbody>
		</table>
	);
};

let mapStateToProps = (state, { itemId }) => ({
    participations: queries.edit(state, EntityType.participation, itemId).data,
    participants: queries.entityAllData(state, EntityType.participant)
});

let mapEventsToProps = (events, { itemId }) => ({
    onParticipatesChange: (participantId, isChecked) => alert('' + participantId + ' ' + isChecked)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipationsEditor);
