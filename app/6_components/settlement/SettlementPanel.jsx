import React from 'react'
import { connect } from 'reactReduxUtils'
import { Button } from 'inputs'
import PaymentsList from './PaymentsList.jsx'

let SettlementPanel = ({ onSettleClick }) => {
    // TODO: Copying payments to clipboard

    return (
        <div className='panel panel-default'>
            <div className='panel-heading'>
                <h3 className='panel-title'>Settlement</h3>
            </div>
            <div className='panel-body'>
                <Button onClick={() => onSettleClick()}>Settle</Button>
            </div>
            <PaymentsList />
        </div>
    );
};

let mapEventsToProps = events => ({
    onSettleClick: () => events.settlementRequested()
});

export default connect(null, mapEventsToProps)(SettlementPanel);
