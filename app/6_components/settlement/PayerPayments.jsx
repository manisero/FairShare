import React from 'react'
import { Money } from 'compUtils'

let Payment = ({ amount, payee }) => (
    <li>
        <Money amount={amount} /> to {payee.name}
    </li>
);

let PayerPayments = ({ payerId, payments, participants }) => {
    let payer = participants[payerId];

    let paymentElements = payments.map(
        p => <Payment key={p.payeeId} amount={p.amount} payee={participants[p.payeeId]} />
    );

    return (
        <li>
            {payer.name} owes:
            <ul>
                {paymentElements}
            </ul>
        </li>
    );
};

export default PayerPayments;
