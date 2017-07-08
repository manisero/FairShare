import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Button } from 'inputs'

let SettlementPanel = ({ paymentIds, payments, participants, onSettleClick }) => {
    let paymentElements = paymentIds.map(paymentId => {
        let payment = payments[paymentId];
        let payer = participants[payment.payerId];
        let payee = participants[payment.payeeId];

        return (
            <div key={paymentId}>
                {payer.name} owes {payment.amount} to {payee.name}
            </div>
        );
    });

    return (
        <div className='panel panel-default'>
            <div className='panel-heading'>
                <h3 className='panel-title'>Settlement</h3>
            </div>
            <div className='panel-body'>
                <Button onClick={() => onSettleClick()}>Settle</Button>
            </div>
            <div>
                {paymentElements}
            </div>
        </div>
    );
};

let mapStateToProps = state => ({
    paymentIds: queries.entityIds(state, EntityType.payment),
    payments: queries.entityAllData(state, EntityType.payment),
    participants: queries.entityAllData(state, EntityType.participant)
});

let mapEventsToProps = events => ({
    onSettleClick: () => events.settlementRequested()
});

export default connect(mapStateToProps, mapEventsToProps)(SettlementPanel);
