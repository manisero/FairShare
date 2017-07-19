import React from 'react'
import { connect } from 'reactReduxUtils'
import { Button } from 'inputs'
import PaymentsList from './PaymentsList.jsx'

let SettledSettlement = ({ onCopyClick }) => {
    return (
        <div>
            <PaymentsList />
            <Button onClick={() => onCopyClick()}>Copy to clipboard</Button>
        </div>
    );
};

let mapEventsToProps = events => ({
    onCopyClick: () => events.settlementClipboardCopyRequested()
});

export default connect(null, mapEventsToProps)(SettledSettlement);
