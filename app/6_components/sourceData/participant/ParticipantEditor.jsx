import React from 'react'
import { safeGet } from 'jsUtils'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Right } from 'compUtils'
import { Button, ButtonGroup, TextBox, MoneyBox } from 'inputs'

class ParticipantEditor extends React.Component {
	componentDidMount() {
		this.nameInput.focus();
	}

	render() {
		let { participant, error, submitEnabled, onNameChange, onContributionChange, onSubmitClick, onCancelClick } = this.props;

		return (
			<form>
				<div className='form-horizontal'>
					<TextBox ref={x => this.nameInput = x} label='Name' valueString={participant.name} error={safeGet(error, 'name')} onChange={x => onNameChange(x)} />
					<span className='hidden'><MoneyBox label='Contribution' valueString={participant.contribution_string} initialValue={participant.contribution} error={safeGet(error, 'contribution')} onChange={x => onContributionChange(x)} /></span>
				</div>
				<Right>
					<ButtonGroup>
						<Button isSubmit onClick={onSubmitClick} disabled={!submitEnabled}>Submit</Button>
						<Button onClick={onCancelClick}>Cancel</Button>
					</ButtonGroup>
				</Right>
			</form>
		);
	}
};

let mapStateToProps = (state, { participantId }) => {
	let { data, error } = queries.edit(state, EntityType.participant, participantId);

	return {
		participant: data,
		error: error,
		submitEnabled: error == null
	}
};

let mapEventsToProps = (events, { participantId }) => ({
	onNameChange: name => events.participantEdit_Updated(participantId, { name: { $set: name } }),
	onContributionChange: contribution => events.participantEdit_Updated(participantId, {
		contribution: { $set: contribution.value },
		contribution_string: { $set: contribution.valueString }
	}),
	onSubmitClick: () => events.participantEdit_Submitted(participantId),
	onCancelClick: () => events.participantEdit_Cancelled(participantId)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantEditor);
