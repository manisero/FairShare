import React from 'react'
import { ifNull, mapObjectFields } from 'jsUtils'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Center } from 'compUtils'
import { Checkbox, NumberBox } from 'inputs'

let ParticipationEditor = ({ participation, participant, error, onContributionChange, onParticipatesChange }) => (
    <tr>
        <td>{participant.name}</td>
        <td>
            <NumberBox value={participation.contribution} error={error.contribution} noMargin onChange={onContributionChange} />
        </td>
        <td>
            <Center>
                <Checkbox checked={participation.participates} error={error.participates} onChange={onParticipatesChange} />
            </Center>
        </td>
    </tr>
);

let ParticipationsEditor = ({ participations, participants, error, onContributionChange, onParticipatesChange }) => {
	let participationEditors = mapObjectFields(
		participations,
		(participation, participantId) => (
            <ParticipationEditor
                key={participantId}
                participation={participation}
                participant={participants[participantId]}
                error={ifNull(error[participantId], () => ({}))}
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

let mapStateToProps = (state, { itemId }) => {
    let { data, error } = queries.edit(state, EntityType.participation, itemId);

    return {
        participations: data,
        error: ifNull(error, () => ({})),
        participants: queries.entityAllData(state, EntityType.participant)
    };
};

let mapEventsToProps = (events, { itemId }) => ({
    onContributionChange: (participantId, val) => events.participationEdit_Updated(itemId, { [participantId]: { contribution: { $set: val } } }),
    onParticipatesChange: (participantId, val) => events.participationEdit_Updated(itemId, { [participantId]: { participates: { $set: val } } }),
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipationsEditor);
