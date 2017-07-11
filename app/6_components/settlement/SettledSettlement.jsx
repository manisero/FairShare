import React from 'react'
import { connect } from 'reactReduxUtils'
import { Button } from 'inputs'
import PaymentsList from './PaymentsList.jsx'

let SettledSettlement = ({ onResettleClick }) => {
    // TODO: Copying payments to clipboard

    return (
        <div>
            <Button onClick={() => onResettleClick()}>Resettle</Button>
            <PaymentsList />
        </div>
    );
};

let mapEventsToProps = events => ({
    onResettleClick: () => events.settlementRequested()
});

export default connect(null, mapEventsToProps)(SettledSettlement);
