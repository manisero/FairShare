import React from 'react'
import { mapObjectFields } from 'jsUtils'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Center } from 'compUtils'
import { Checkbox } from 'inputs'

let ParticipationDetails = ({ participation, participant }) => (
    <tr>
        <td>{participant.name}</td>
        <td>{participation.contribution}</td>
        <td>
            <Center>
                <Checkbox checked={participation.participates} disabled noMargin />
            </Center>
        </td>
    </tr>
);

let ParticipationsDetails = ({ participations, participants }) => {
	let participationDetails = mapObjectFields(
		participations,
		(participation, participantId) => (
            <ParticipationDetails
                key={participantId}
                participation={participation}
                participant={participants[participantId]} />
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
				{participationDetails}
			</tbody>
		</table>
	);
};

let mapStateToProps = (state, { itemId }) => ({
    participations: queries.entityData(state, EntityType.participation, itemId),
    participants: queries.entityAllData(state, EntityType.participant)
});

export default connect(mapStateToProps)(ParticipationsDetails);
