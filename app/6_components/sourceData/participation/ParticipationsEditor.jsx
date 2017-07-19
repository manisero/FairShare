import React from 'react'
import { safeGet, mapObjectFields } from 'jsUtils'
import { connect } from 'reactReduxUtils'
import { EntityType, ParticipationMode } from 'model'
import queries from 'queries'
import { Center, Error } from 'compUtils'
import { Checkbox, Dropdown, MoneyBox } from 'inputs'

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
                <MoneyBox valueString={participation.contribution_string} initialValue={participation.contribution} error={safeGet(error, 'contribution')} noMargin onChange={onContributionChange} />
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

let ParticipationsEditor = ({ mode, participations, participants, error, onModeChange, onContributedChange, onContributionChange, onParticipatesChange }) => {
	let participationEditors = mapObjectFields(
		participations,
		(participation, participantId) => (
            <ParticipationEditor
                key={participantId}
                mode={mode}
                participation={participation}
                participant={participants[participantId]}
                error={safeGet(error, participantId)}
                onContributedChange={val => onContributedChange(participantId, val)}
                onContributionChange={val => onContributionChange(participantId, val)}
                onParticipatesChange={val => onParticipatesChange(participantId, val)} />
        )
	);

	return (
        <div>
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
            <Error error={safeGet(error, '_general')} />
        </div>
	);
};

// Adder

let adderMappings = {
    mapStateToProps: state => ({
        mode: queries.participationEditMode(state),
        participations: queries.toAdd_next(state, EntityType.participation),
        error: queries.toAdd_nextError(state, EntityType.participation),
        participants: queries.entityAllData(state, EntityType.participant)
    }),
    mapEventsToProps: events => ({
        onModeChange: mode => events.participationEditModeChanged(mode),
        onContributedChange: (participantId, val) => events.participationAdd_Updated({ [participantId]: { contributed: { $set: val } } }),
        onContributionChange: (participantId, val) => events.participationAdd_Updated({ [participantId]: {
            contribution: { $set: val.value },
            contribution_string: { $set: val.valueString }
        } }),
        onParticipatesChange: (participantId, val) => events.participationAdd_Updated({ [participantId]: { participates: { $set: val } } })
    })
};

let Adder = connect(adderMappings.mapStateToProps, adderMappings.mapEventsToProps)(ParticipationsEditor);

// Editor

let editorMappings = {
    mapStateToProps: (state, { itemId }) => {
        let { data, error } = queries.edit(state, EntityType.participation, itemId);

        return {
            mode: queries.participationEditMode(state),
            participations: data,
            error: error,
            participants: queries.entityAllData(state, EntityType.participant)
        };
    },
    mapEventsToProps: (events, { itemId }) => ({
        onModeChange: mode => events.participationEditModeChanged(mode),
        onContributedChange: (participantId, val) => events.participationEdit_Updated(itemId, { [participantId]: { contributed: { $set: val } } }),
        onContributionChange: (participantId, val) => events.participationEdit_Updated(itemId, { [participantId]: {
            contribution: { $set: val.value },
            contribution_string: { $set: val.valueString }
        } }),
        onParticipatesChange: (participantId, val) => events.participationEdit_Updated(itemId, { [participantId]: { participates: { $set: val } } })
    })
};

let Editor = connect(editorMappings.mapStateToProps, editorMappings.mapEventsToProps)(ParticipationsEditor);

export { Adder as ParticipationsAdder, Editor as ParticipationsEditor };
