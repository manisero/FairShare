import React from 'react'
import { connect } from 'reactReduxUtils'
import { Button } from 'inputs'
import ParticipantTile from './participant/Tile.jsx'
import ItemTile from './item/Tile.jsx'

let List = ({ title, children, selectedItemKey, onItemSelect, onAddClick }) => {
    let items = children.map(child => {
        let key = child.props.itemKey;

        return key === selectedItemKey
            ? (<div key={key} className="list-group-item">{child}</div>)
            : (<a key={key} href="#" onClick={() => onItemSelect(key)} className="list-group-item">{child}</a>);
    });

    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">{title}</h3>
            </div>
            <div className="panel-body">
                <div className="list-group">
                    {items}
                </div>
                <Button onClick={() => onAddClick()}>Add</Button>
            </div>
        </div>
    );
};

let participantListMappings = {
    mapStateToProps: state => ({
        title: 'Participants',
	    children: state.data.participants.ids.map(id => (<ParticipantTile itemKey={id} participantId={id} />)),
        selectedItemKey: state.ui.participantFocus.itemId
    }),
    mapEventsToProps: events => ({
        onItemSelect: participantId => events.participantSelected(participantId),
        onAddClick: () => events.participantAdded()
    })
};

let ParticipantList = connect(participantListMappings.mapStateToProps, participantListMappings.mapEventsToProps)(List);

let itemListMappings = {
    mapStateToProps: state => ({
        title: 'Items',
	    children: state.data.items.ids.map(id => (<ItemTile itemKey={id} itemId={id} />)),
        selectedItemKey: state.ui.selectedItemId
    }),
    mapEventsToProps: events => ({
        onItemSelect: itemId => events.itemSelected(itemId),
        onAddClick: () => events.itemAdded()
    })
};

let ItemList = connect(itemListMappings.mapStateToProps, itemListMappings.mapEventsToProps)(List);

export { ParticipantList, ItemList };
