import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Right } from 'compUtils'
import { Button, ButtonGroup, TextBox } from 'inputs'

let ParticipantAdder = ({ participant, onNameChange, children }) => (
	<div className='row'>
		<div className='col-xs-9'>
			<TextBox placeholder='Name' valueString={participant.name} onChange={x => onNameChange(x)} />
		</div>
		<div className='col-xs-3'>
			<Right>
				{children}
			</Right>
		</div>
	</div>
);

let ParticipantsAdder = ({ participants, nextParticipant, onAddClick, onNameChange, onNextNameChange, onRemoveClick, onSubmitClick, onCancelClick }) => {
	let participantAdders = participants.map((p, i) => (
		<ParticipantAdder key={i} participant={p} onNameChange={val => onNameChange(i, val)}>
			<Button tabIndex={-1} onClick={() => onRemoveClick(i)}>X</Button>
		</ParticipantAdder>
	));

	let nextParticipantAdder = (
		<form>
			<ParticipantAdder participant={nextParticipant} onNameChange={val => onNextNameChange(val)}>
				<Button isSubmit onClick={onAddClick}>Add</Button>
			</ParticipantAdder>
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
