import React from 'react'
import { connect } from 'reactReduxUtils'
import { Center } from 'compUtils'
import { Button, ButtonGroup } from 'inputs'

let ParticipantDeletor = ({ participant, onDeleteClick, onCancelClick }) => (
	<div>
		<div>Delete <b>{participant.name}</b>?</div>
        <Center>
            <ButtonGroup>
                <Button onClick={onDeleteClick}>Yes</Button>
                <Button onClick={onCancelClick}>Cancel</Button>
            </ButtonGroup>
        </Center>
	</div>
);

let mapStateToProps = (state, { participantId }) => ({
	participant: state.data.participant.items[participantId] 
});

let mapEventsToProps = (events, { participantId }) => ({
    onDeleteClick: () => events.participantDeleteSubmitted(participantId),
	onCancelClick: () => events.participantDeleteCancelled(participantId)
});

export default connect(mapStateToProps, mapEventsToProps)(ParticipantDeletor);
