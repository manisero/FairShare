import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Left, Right } from 'compUtils'
import { Button, ButtonGroup, TextBox } from 'inputs'

let ParticipantAdder = ({ participant, onNameChange }) => (
	<div>
		<TextBox placeholder='Name' valueString={participant.name} onChange={x => onNameChange(x)} />
	</div>
);

let ParticipantsAdder = ({ participants, nextParticipant, onAddClick, onNameChange, onNextNameChange, onRemoveClick, onSubmitClick, onCancelClick }) => {
	let participantAdders = participants.map((p, i) => (
		<div key={i} className='row'>
			<div className='col-xs-9'>
				<ParticipantAdder participant={p} onNameChange={val => onNameChange(i, val)} />
			</div>
			<div className='col-xs-3'>
				<Right>
					<Button onClick={() => onRemoveClick(i)}>X</Button>
				</Right>
			</div>
		</div>
	));

	let nextParticipantAdder = (
		<form>
			<div className='row'>
				<div className='col-xs-9'>
					<ParticipantAdder participant={nextParticipant} onNameChange={val => onNextNameChange(val)} />
				</div>
				<div className='col-xs-3'>
					<Right>
						<Button isSubmit onClick={onAddClick}>Add</Button>
					</Right>
				</div>
			</div>
		</form>
	);

	return (
		<div>
			<div>
				{participantAdders}
				{nextParticipantAdder}
			</div>
			<Right>
				<ButtonGroup>
					<Button onClick={onSubmitClick}>Submit</Button>
					<Button onClick={onCancelClick}>Cancel</Button>
				</ButtonGroup>
			</Right>
		</div>
	);
};

let mapStateToProps = state => ({
	participants: queries.toAdd_allAdded(state, EntityType.participant),
	nextParticipant: queries.toAdd_next(state, EntityType.participant)
});

let mapEventsToProps = events => ({
	onAddClick: () => events.participantsAdd_Added(),
	onNameChange: (index, name) => events.participantsAdd_Updated(index, { name: { $set: name } }),
	onNextNameChange: name => events.participantsAdd_NextUpdated({ name: { $set: name } }),
	onRemoveClick: index => events.participantsAdd_Removed(index),
	onSubmitClick: () => events.participantsAdd_Submitted(),
	onCancelClick: () => events.participantsAdd_Cancelled()
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantsAdder);
