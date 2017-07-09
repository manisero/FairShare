import React from 'react'
import { Money } from 'compUtils'

let ParticipantLabel = ({ participant }) => {
    return participant != null
        ? <span>{participant.name}</span>
        : <span className='text-danger'>Unknown</span>
};

let Payment = ({ amount, payee }) => (
    <li>
        <Money amount={amount} /> to <ParticipantLabel participant={payee} />
    </li>
);

let PayerPayments = ({ payerId, payments, participants }) => {
    let payer = participants[payerId];

    let paymentElements = payments.map(
        p => <Payment key={p.payeeId} amount={p.amount} payee={participants[p.payeeId]} />
    );

    return (
        <li>
            <ParticipantLabel participant={payer} /> owes:
            <ul>
                {paymentElements}
            </ul>
        </li>
    );
};

export default PayerPayments;
