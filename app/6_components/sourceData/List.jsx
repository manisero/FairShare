import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType, FocusMode } from 'model'
import queries from 'queries'
import { Left, Right } from 'compUtils'
import { Button } from 'inputs'
import { ParticipantTile, ItemTile } from './Tile.jsx'
import ParticipantsAdder from './participantsAdder/ParticipantsAdder.jsx'
import ParticipantsStats from './ParticipantsStats.jsx'
import ItemsStats from './ItemsStats.jsx'

let List = ({ title, entityIds, itemFactory, selectedEntityId, showAdder, adderFactory, statsFactory, onItemSelect, onAddClick }) => {
    let items = entityIds.map(id => {
        let item = itemFactory(id);

        return id === selectedEntityId
            ? (<div key={id} className='list-group-item'>{item}</div>)
            : (<a key={id} href='#' onClick={() => onItemSelect(id)} className='list-group-item'>{item}</a>);
    });

    let footer = showAdder
        ? adderFactory()
        : (
            <div>
                <Left isNotLast>
                    <div className='form-control-static' style={{minHeight: 0, paddingBottom: 0}}>
                    {statsFactory()}
                    </div>
                </Left>
                <Right>
                    <Button onClick={() => onAddClick()}>Add</Button>
                </Right>
            </div>
        );

    return (
        <div className='panel panel-default'>
            <div className='panel-heading'>
                <h3 className='panel-title'>{title}</h3>
            </div>
            <div className='list-group'>
                {items}
            </div>
            <div className='panel-body'>
                {footer}
            </div>
        </div>
    );
};

// Participant:

let participantFactories = {
    item: id => <ParticipantTile participantId={id} />,
    adder: () => <ParticipantsAdder />,
    stats: () => <ParticipantsStats />
};

let participantMappings = {
    mapStateToProps: state => {
        let { mode: focusMode, itemId: focusedId } = queries.focus(state, EntityType.participant);

        return {
            title: 'Participants',
            entityIds: queries.entityIds(state, EntityType.participant),
            itemFactory: participantFactories.item,
            selectedEntityId: focusedId,
            showAdder: focusMode === FocusMode.added,
            adderFactory: participantFactories.adder,
            statsFactory: participantFactories.stats
        };
    },
    mapEventsToProps: events => ({
        onItemSelect: participantId => events.participantSelected(participantId),
        onAddClick: () => events.participantsAdd_Started()
    })
};

let ParticipantList = connect(participantMappings.mapStateToProps, participantMappings.mapEventsToProps)(List);

// Item:

let itemFactories = {
    item: id => <ItemTile itemId={id} />,
    stats: () => <ItemsStats />
};

let itemMappings = {
    mapStateToProps: state => ({
        title: 'Items',
        entityIds: queries.entityIds(state, EntityType.item),
	    itemFactory: itemFactories.item,
        selectedEntityId: queries.focus(state, EntityType.item).itemId,
        statsFactory: itemFactories.stats
    }),
    mapEventsToProps: events => ({
        onItemSelect: itemId => events.itemSelected(itemId),
        onAddClick: () => events.itemAdded()
    })
};

let ItemList = connect(itemMappings.mapStateToProps, itemMappings.mapEventsToProps)(List);

export { ParticipantList, ItemList };
