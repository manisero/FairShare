import React from 'react'

let Payment = ({ amount, payee }) => (
    <div>
        {amount} to {payee.name}
    </div>
);

let PayerPayments = ({ payerId, payments, participants }) => {
    let payer = participants[payerId];

    let paymentElements = payments.map(
        p => <Payment key={p.payeeId} amount={p.amount} payee={participants[p.payeeId]} />
    );

    return (
        <div>
            <div>{payer.name} owes:</div>
            <div>
                {paymentElements}
            </div>
        </div>
    );
};

export default PayerPayments;
