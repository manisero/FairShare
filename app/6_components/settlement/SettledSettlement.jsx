import React from 'react'
import { connect } from 'reactReduxUtils'
import { Button, ButtonGroup } from 'inputs'
import PaymentsList from './PaymentsList.jsx'

let SettledSettlement = ({ onResettleClick, onCopyClick }) => {
    // TODO: Copying payments to clipboard

    return (
        <div>
            <ButtonGroup>
                <Button onClick={() => onCopyClick()}>Copy to clipboard</Button>
                <Button onClick={() => onResettleClick()}>Resettle</Button>
            </ButtonGroup>
            <PaymentsList />
        </div>
    );
};

let mapEventsToProps = events => ({
    onResettleClick: () => events.settlementRequested(),
    onCopyClick: () => events.settlementClipboardCopyRequested()
});

export default connect(null, mapEventsToProps)(SettledSettlement);
