import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Center } from 'compUtils'
import { Button, ButtonGroup } from 'inputs'

let Deletor = ({ itemName, onDeleteClick, onCancelClick }) => (
	<div>
		<div>Delete <b>{itemName}</b>?</div>
        <Center>
            <ButtonGroup>
                <Button onClick={onDeleteClick}>Yes</Button>
                <Button onClick={onCancelClick}>Cancel</Button>
            </ButtonGroup>
        </Center>
	</div>
);

// Participant

let participantMappings = {
    mapStateToProps: (state, { participantId }) => ({
        itemName: queries.entityData(state, EntityType.participant, participantId).name
    }),
    mapEventsToProps: (events, { participantId }) => ({
        onDeleteClick: () => events.participantDelete_Submitted(participantId),
        onCancelClick: () => events.participantDelete_Cancelled(participantId)
    })
};

let ParticipantDeletor = connect(participantMappings.mapStateToProps, participantMappings.mapEventsToProps)(Deletor) 

// Item

let itemMappings = {
    mapStateToProps: (state, { itemId }) => ({
        itemName: queries.entityData(state, EntityType.item, itemId).name
    }),
    mapEventsToProps: (events, { itemId }) => ({
        onDeleteClick: () => events.itemDelete_Submitted(itemId),
        onCancelClick: () => events.itemDelete_Cancelled(itemId)
    })
};

let ItemDeletor = connect(itemMappings.mapStateToProps, itemMappings.mapEventsToProps)(Deletor) 

export { ParticipantDeletor, ItemDeletor };
