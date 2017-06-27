import React from 'react'
import { connect } from 'reactReduxUtils'
import { Button, ButtonGroup } from 'inputs'

let ParticipantDeletor = ({ participant, onYesClick, onCancelClick }) => (
	<div>
		<div>Delete <b>{participant.name}</b>?</div>
        <ButtonGroup>
            <Button onClick={onYesClick}>Yes</Button>
            <Button onClick={onCancelClick}>Cancel</Button>
        </ButtonGroup>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.data.participants.items[participantId] 
});

let mapEventsToProps = (events, { participantId }) => ({
	onCancelClick: () => events.participantEditingCancelled(participantId)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantDeletor);
