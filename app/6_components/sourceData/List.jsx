import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Left, Right } from 'compUtils'
import { Button } from 'inputs'
import { ParticipantTile, ItemTile } from './Tile.jsx'
import ParticipantsStats from './ParticipantsStats.jsx'
import ItemsStats from './ItemsStats.jsx'

let List = ({ title, entityIds, itemFactory, selectedEntityId, statsElementFactory, onItemSelect, onAddClick }) => {
    let items = entityIds.map(id => {
        let item = itemFactory(id);

        return id === selectedEntityId
            ? (<div key={id} className='list-group-item'>{item}</div>)
            : (<a key={id} href='#' onClick={() => onItemSelect(id)} className='list-group-item'>{item}</a>);
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
                    {statsElementFactory()}
                </Left>
                <Right>
                    <Button onClick={() => onAddClick()}>Add</Button>
                </Right>
            </div>
        </div>
    );
};

// Participant:

let participantFactories = {
    item: id => <ParticipantTile participantId={id} />,
    statsElement: () => <ParticipantsStats />
};

let participantMappings = {
    mapStateToProps: state => ({
        title: 'Participants',
        entityIds: queries.entityIds(state, EntityType.participant),
	    itemFactory: participantFactories.item,
        selectedEntityId: queries.focus(state, EntityType.participant).itemId,
        statsElementFactory: participantFactories.statsElement
    }),
    mapEventsToProps: events => ({
        onItemSelect: participantId => events.participantSelected(participantId),
        onAddClick: () => events.participantAdded()
    })
};

let ParticipantList = connect(participantMappings.mapStateToProps, participantMappings.mapEventsToProps)(List);

// Item:

let itemFactories = {
    item: id => <ItemTile itemId={id} />,
    statsElement: () => <ItemsStats />
};

let itemMappings = {
    mapStateToProps: state => ({
        title: 'Items',
        entityIds: queries.entityIds(state, EntityType.item),
	    itemFactory: itemFactories.item,
        selectedEntityId: queries.focus(state, EntityType.item).itemId,
        statsElementFactory: itemFactories.statsElement
    }),
    mapEventsToProps: events => ({
        onItemSelect: itemId => events.itemSelected(itemId),
        onAddClick: () => events.itemAdded()
    })
};

let ItemList = connect(itemMappings.mapStateToProps, itemMappings.mapEventsToProps)(List);

export { ParticipantList, ItemList };
