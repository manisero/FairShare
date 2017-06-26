import React from 'react'
import { connect } from 'reactReduxUtils'
import Button from './inputs/Button.jsx'
import ParticipantTile from './ParticipantTile.jsx'
import ItemTile from './ItemTile.jsx'

let List = ({ children, onAddClick }) => (
	<div>
        {children}
		<Button value='ADD' onClick={() => onAddClick()} />
	</div>
);

let participantListMappings = {
    mapStateToProps: state => ({
	    children: state.data.participants.ids.map(id => (<ParticipantTile key={id} participantId={id} />))
    }),
    mapEventsToProps: events => ({
        onAddClick: () => events.participantAdded()
    })
};

let ParticipantList = connect(participantListMappings.mapStateToProps, participantListMappings.mapEventsToProps)(List);

let itemListMappings = {
    mapStateToProps: state => ({
	    children: state.data.items.ids.map(id => (<ItemTile key={id} itemId={id} />))
    }),
    mapEventsToProps: events => ({
        onAddClick: () => events.itemAdded()
    })
};

let ItemList = connect(itemListMappings.mapStateToProps, itemListMappings.mapEventsToProps)(List);

export { ParticipantList, ItemList };
