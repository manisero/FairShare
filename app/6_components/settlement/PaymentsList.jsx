import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Money } from 'compUtils'

let ParticipantLabel = ({ participant }) => participant != null
    ? <span>{participant.name}</span>
    : <span className='text-danger'>Unknown</span>;

let PayerPayments = ({ payerId, payments, participants }) => {
    let paymentElements = payments.map(p => (
        <li key={p.payeeId}>
            <Money amount={p.amount} /> to <ParticipantLabel participant={participants[p.payeeId]} />
        </li>
    ));

    return (
        <li>
            <ParticipantLabel participant={participants[payerId]} /> owes:
            <ul>
                {paymentElements}
            </ul>
        </li>
    );
};

let PaymentsList = ({ paymentsByPayerId, participants }) => {
    let payerPayments = Object.entries(paymentsByPayerId).map(([payerId, payments]) =>
        <PayerPayments key={payerId} payerId={payerId} payments={payments} participants={participants} />
    );

    return (
        <ul>
            {payerPayments}
        </ul>
    );
};

let mapStateToProps = state => ({
    paymentsByPayerId: queries.paymentsByPayerId(state),
    participants: queries.entityAllData(state, EntityType.participant)
});

export default connect(mapStateToProps)(PaymentsList);
