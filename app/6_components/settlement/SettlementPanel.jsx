import React from 'react'
import { connect } from 'reactReduxUtils'
import { Button } from 'inputs'

let SettlementPanel = ({ title, onSettleClick }) => {
    return (
        <div className='panel panel-default'>
            <div className='panel-heading'>
                <h3 className='panel-title'>{title}</h3>
            </div>
            <div className='panel-body'>
                <Button onClick={() => onSettleClick()}>Settle</Button>
            </div>
        </div>
    );
};

let mapStateToProps = state => ({
    title: 'Settlement'
});

let mapEventsToProps = events => ({
    onSettleClick: () => events.settlementRequested()
});

export default connect(mapStateToProps, mapEventsToProps)(SettlementPanel);
