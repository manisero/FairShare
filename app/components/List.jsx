import React from 'react'
import { connect } from 'reactReduxUtils'
import Button from './inputs/Button.jsx'
import ParticipantTile from './participant/Tile.jsx'
import ItemTile from './item/Tile.jsx'

let List = ({ title, children, onItemClick, onAddClick }) => {
    let items = children.map(child => (
        <a key={child.props.itemKey} href="#" onClick={() => onItemClick(child.props.itemKey)} className="list-group-item">{child}</a>
    ));

    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">{title}</h3>
            </div>
            <div className="panel-body">
                <div className="list-group">
                    {items}
                </div>
                <Button value='ADD' onClick={() => onAddClick()} />
            </div>
        </div>
    );
};

let participantListMappings = {
    mapStateToProps: state => ({
        title: 'Participants',
	    children: state.data.participants.ids.map(id => (<ParticipantTile itemKey={id} participantId={id} />))
    }),
    mapEventsToProps: events => ({
        onItemClick: participantId => events.participantSelected(participantId),
        onAddClick: () => events.participantAdded()
    })
};

let ParticipantList = connect(participantListMappings.mapStateToProps, participantListMappings.mapEventsToProps)(List);

let itemListMappings = {
    mapStateToProps: state => ({
        title: 'Items',
	    children: state.data.items.ids.map(id => (<ItemTile itemKey={id} itemId={id} />))
    }),
    mapEventsToProps: events => ({
        onItemClick: itemId => events.itemSelected(itemId),
        onAddClick: () => events.itemAdded()
    })
};

let ItemList = connect(itemListMappings.mapStateToProps, itemListMappings.mapEventsToProps)(List);

export { ParticipantList, ItemList };
