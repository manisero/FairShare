import React from 'react'
import { connect } from 'reactReduxUtils'
import { Left, Right } from 'compUtils'
import { Button, ButtonGroup } from 'inputs'
import { AddedParticipants, NextParticipant } from './ParticipantAdders.jsx'
import ParticipantAdderStats from './ParticipantAdderStats.jsx'

let ParticipantsAdder = ({ onSubmitClick, onCancelClick }) => (
	<div>
		<div>
			<AddedParticipants />
			<NextParticipant />
		</div>
		<div>
			<Left isNotLast>
				<ParticipantAdderStats />
			</Left>
			<Right>
				<ButtonGroup>
					<Button onClick={onSubmitClick}>Submit</Button>
					<Button onClick={onCancelClick}>Cancel</Button>
				</ButtonGroup>
			</Right>
		</div>
	</div>
);

let mapEventsToProps = events => ({
	onSubmitClick: () => events.participantsAdd_Submitted(),
	onCancelClick: () => events.participantsAdd_Cancelled()
});

export default connect(null, mapEventsToProps)(ParticipantsAdder);
