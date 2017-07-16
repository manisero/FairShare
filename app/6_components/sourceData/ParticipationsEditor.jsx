import React from 'react'
import { safeGet, mapObjectFields } from 'jsUtils'
import { connect } from 'reactReduxUtils'
import { EntityType, ParticipationMode } from 'model'
import queries from 'queries'
import { Center } from 'compUtils'
import { Checkbox, Dropdown, NumberBox } from 'inputs'

let ParticipationEditor = ({ mode, participation, participant, error, onContributedChange, onContributionChange, onParticipatesChange }) => {
    let contributionEditor = mode === ParticipationMode.even
        ? (
            <td>
                <Center>
                    <Checkbox checked={participation.contributed} error={safeGet(error, 'contributed')} smallMargin onChange={onContributedChange} />
                </Center>
            </td>
        )
        : (
            <td className='form-horizontal'>
                <NumberBox valueString={participation.contribution_string} initialValue={participation.contribution} error={safeGet(error, 'contribution')} noMargin onChange={onContributionChange} />
            </td>
        );

    return (
        <tr>
            <td>
                <div className='form-control-static'>
                    {participant.name}
                </div>
            </td>
            {contributionEditor}
            <td>
                <Center>
                    <Checkbox checked={participation.participates} error={safeGet(error, 'participates')} smallMargin onChange={onParticipatesChange} />
                </Center>
            </td>
        </tr>
    );
};

let ParticipationsEditor = ({ mode, participations, participants, error, onModeChange, onContributionChange, onParticipatesChange }) => {
	let participationEditors = mapObjectFields(
		participations,
		(participation, participantId) => (
            <ParticipationEditor
                key={participantId}
                mode={mode}
                participation={participation}
                participant={participants[participantId]}
                error={safeGet(error, participantId)}
                onContributionChange={val => onContributionChange(participantId, val)}
                onParticipatesChange={val => onParticipatesChange(participantId, val)} />
        )
	);

	return (
		<table className="table table-striped table-condensed">
			<thead>
				<tr>
					<th className='col-xs-6'>Participants</th>
					<th className='col-xs-4'>
                        <Dropdown label='Paid'>
                            <Dropdown.Option isSelected={mode === ParticipationMode.even} onSelect={() => onModeChange(ParticipationMode.even)}>Even</Dropdown.Option>
                            <Dropdown.Option isSelected={mode === ParticipationMode.uneven} onSelect={() => onModeChange(ParticipationMode.uneven)}>Not even</Dropdown.Option>
                        </Dropdown>
                    </th>
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
        mode: queries.participationEditMode(state),
        participations: data,
        error: error,
        participants: queries.entityAllData(state, EntityType.participant)
    };
};

let mapEventsToProps = (events, { itemId }) => ({
    onModeChange: mode => events.participationEdit_ModeChanged(mode),
    onContributionChange: (participantId, val) => events.participationEdit_Updated(itemId, { [participantId]: {
		contribution: { $set: val.value },
		contribution_string: { $set: val.valueString }
	} }),
    onParticipatesChange: (participantId, val) => events.participationEdit_Updated(itemId, { [participantId]: { participates: { $set: val } } })
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipationsEditor);
