import React from 'react'
import { connect } from 'reactReduxUtils'
import Button from './inputs/Button.jsx'
import ParticipantTile from './ParticipantTile.jsx'
import ItemTile from './ItemTile.jsx'

let List = ({ title, children, onAddClick }) => {
    let items = children.map(child => <a key={child.key} href="#" className="list-group-item">{child}</a>);

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
	    children: state.data.participants.ids.map(id => (<ParticipantTile key={id} participantId={id} />))
    }),
    mapEventsToProps: events => ({
        onAddClick: () => events.participantAdded()
    })
};

let ParticipantList = connect(participantListMappings.mapStateToProps, participantListMappings.mapEventsToProps)(List);

let itemListMappings = {
    mapStateToProps: state => ({
        title: 'Items',
	    children: state.data.items.ids.map(id => (<ItemTile key={id} itemId={id} />))
    }),
    mapEventsToProps: events => ({
        onAddClick: () => events.itemAdded()
    })
};

let ItemList = connect(itemListMappings.mapStateToProps, itemListMappings.mapEventsToProps)(List);

export { ParticipantList, ItemList };
