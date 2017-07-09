import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Button } from 'inputs'
import PayerPayments from './PayerPayments.jsx'

let SettlementPanel = ({ paymentsByPayerId, participants, onSettleClick }) => {
    // TODO: Copying payments to clipboard

    let payerPayments = Object.entries(paymentsByPayerId).map(
        ([payerId, payments]) => <PayerPayments key={payerId} payerId={payerId} payments={payments} participants={participants} />
    );

    return (
        <div className='panel panel-default'>
            <div className='panel-heading'>
                <h3 className='panel-title'>Settlement</h3>
            </div>
            <div className='panel-body'>
                <Button onClick={() => onSettleClick()}>Settle</Button>
            </div>
            <div>
                {payerPayments}
            </div>
        </div>
    );
};

let mapStateToProps = state => ({
    paymentsByPayerId: queries.paymentsByPayerId(state),
    participants: queries.entityAllData(state, EntityType.participant)
});

let mapEventsToProps = events => ({
    onSettleClick: () => events.settlementRequested()
});

export default connect(mapStateToProps, mapEventsToProps)(SettlementPanel);
