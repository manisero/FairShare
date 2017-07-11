import React from 'react'
import { connect } from 'reactReduxUtils'
import { Button } from 'inputs'

let UnsettledSettlement = ({ onSettleClick }) =>
    <Button onClick={() => onSettleClick()}>Settle</Button>;

let mapEventsToProps = events => ({
    onSettleClick: () => events.settlementRequested()
});

export default connect(null, mapEventsToProps)(UnsettledSettlement);
