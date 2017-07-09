import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Left, Right } from 'compUtils'
import { Button } from 'inputs'
import { ParticipantTile, ItemTile } from './Tile.jsx'
import ParticipantsStats from './ParticipantsStats.jsx'
import ItemsStats from './ItemsStats.jsx'

let List = ({ title, children, selectedItemKey, statsElement, onItemSelect, onAddClick }) => {
    let items = children.map(child => {
        let key = child.props.itemKey;

        return key === selectedItemKey
            ? (<div key={key} className='list-group-item'>{child}</div>)
            : (<a key={key} href='#' onClick={() => onItemSelect(key)} className='list-group-item'>{child}</a>);
    });

    return (
        <div className='panel panel-default'>
            <div className='panel-heading'>
                <h3 className='panel-title'>{title}</h3>
            </div>
            <div className='list-group'>
                {items}
            </div>
            <div className='panel-body'>
                <Left isNotLast>
                    {statsElement}
                </Left>
                <Right>
                    <Button onClick={() => onAddClick()}>Add</Button>
                </Right>
            </div>
        </div>
    );
};

// Participant:

let participantMappings = {
    mapStateToProps: state => ({
        title: 'Participants',
	    children: queries.entityIds(state, EntityType.participant).map(id => (<ParticipantTile itemKey={id} participantId={id} />)),
        selectedItemKey: queries.focus(state, EntityType.participant).itemId,
        statsElement: <ParticipantsStats />
    }),
    mapEventsToProps: events => ({
        onItemSelect: participantId => events.participantSelected(participantId),
        onAddClick: () => events.participantAdded()
    })
};

let ParticipantList = connect(participantMappings.mapStateToProps, participantMappings.mapEventsToProps)(List);

// Item:

let itemMappings = {
    mapStateToProps: state => ({
        title: 'Items',
	    children: queries.entityIds(state, EntityType.item).map(id => (<ItemTile itemKey={id} itemId={id} />)),
        selectedItemKey: queries.focus(state, EntityType.item).itemId,
        statsElement: <ItemsStats />
    }),
    mapEventsToProps: events => ({
        onItemSelect: itemId => events.itemSelected(itemId),
        onAddClick: () => events.itemAdded()
    })
};

let ItemList = connect(itemMappings.mapStateToProps, itemMappings.mapEventsToProps)(List);

export { ParticipantList, ItemList };
