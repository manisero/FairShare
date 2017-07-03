import React from 'react'
import { mapObjectFields } from 'jsUtils'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Center } from 'compUtils'
import { Checkbox, NumberBox } from 'inputs'

let ParticipationEditor = ({ participation, participant, onContributionChange, onParticipatesChange }) => (
    <tr>
        <td>{participant.name}</td>
        <td>
            <NumberBox value={participation.contribution} noMargin onChange={onContributionChange} />
        </td>
        <td>
            <Center>
                <Checkbox checked={participation.participates} onChange={onParticipatesChange} />
            </Center>
        </td>
    </tr>
);

let ParticipationsEditor = ({ participations, participants, onContributionChange, onParticipatesChange }) => {
	let participationEditors = mapObjectFields(
		participations,
		(participation, participantId) => (
            <ParticipationEditor key={participantId}
                participation={participation}
                participant={participants[participantId]}
                onContributionChange={val => onContributionChange(participantId, val)}
                onParticipatesChange={val => onParticipatesChange(participantId, val)} />
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
    onContributionChange: (participantId, val) => events.entityEdit_Updated(EntityType.participation, itemId, { [participantId]: { contribution: { $set: val } } }),
    onParticipatesChange: (participantId, val) => events.entityEdit_Updated(EntityType.participation, itemId, { [participantId]: { participates: { $set: val } } }),
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipationsEditor);
