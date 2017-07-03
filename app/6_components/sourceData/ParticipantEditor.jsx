import React from 'react'
import { ifNull } from 'jsUtils'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Right } from 'compUtils'
import { Button, ButtonGroup, TextBox, NumberBox } from 'inputs'

let ParticipantEditor = ({ participant, error, submitEnabled, onNameChange, onContributionChange, onSubmitClick, onCancelClick }) => (
	<div>
		<TextBox label='Name' value={participant.name} error={error.name} onChange={x => onNameChange(x)} />
		<NumberBox label='Contribution' value={participant.contribution} error={error.contribution} onChange={x => onContributionChange(x)} />
		<Right>
			<ButtonGroup>
				<Button onClick={onSubmitClick} disabled={!submitEnabled}>Submit</Button>
				<Button onClick={onCancelClick}>Cancel</Button>
			</ButtonGroup>
		</Right>
	</div>
);

let mapStateToProps = (state, { participantId }) => {
	let { data, error } = queries.edit(state, EntityType.participant, participantId);

	return {
		participant: data,
		error: ifNull(error, () => ({})),
		submitEnabled: error == null
	}
};

let mapEventsToProps = (events, { participantId }) => ({
	onNameChange: name => events.entityEdit_Updated(EntityType.participant, participantId, { name: { $set: name } }),
	onContributionChange: contribution => events.entityEdit_Updated(EntityType.participant, participantId, { contribution: { $set: contribution } }),
	onSubmitClick: () => events.entityEdit_Submitted(EntityType.participant, participantId),
	onCancelClick: () => events.entityEdit_Cancelled(EntityType.participant, participantId)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantEditor);
