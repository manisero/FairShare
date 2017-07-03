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
        onDeleteClick: () => events.entityDelete_Submitted(EntityType.participant, participantId),
        onCancelClick: () => events.entityDelete_Cancelled(EntityType.participant, participantId)
    })
};

let ParticipantDeletor = connect(participantMappings.mapStateToProps, participantMappings.mapEventsToProps)(Deletor) 

// Item

let itemMappings = {
    mapStateToProps: (state, { itemId }) => ({
        itemName: queries.entityData(state, EntityType.item, itemId).name
    }),
    mapEventsToProps: (events, { itemId }) => ({
        onDeleteClick: () => events.entityDelete_Submitted(EntityType.item, itemId),
        onCancelClick: () => events.entityDelete_Cancelled(EntityType.item, itemId)
    })
};

let ItemDeletor = connect(itemMappings.mapStateToProps, itemMappings.mapEventsToProps)(Deletor) 

export { ParticipantDeletor, ItemDeletor };