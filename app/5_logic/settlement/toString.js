let formatParticipant = participant => participant != null
    ? participant.name
    : '[Unknown]';

let formatAmount = amount => amount.toFixed(2);

let formatPayment = (payment, payee) =>
    '- ' + formatAmount(payment.amount) + ' to ' + formatParticipant(payee);

let formatPayerPayments = (payerId, payments, participants) => {
    let payerLine = formatParticipant(participants[payerId]) + ' owes:';

    let paymentLines = payments.map(p => formatPayment(p, participants[p.payeeId]));

    return [payerLine, ...paymentLines].join('\n');
};

let toString = (paymentsByPayerId, participants) => {
    let payerPayments = Object.entries(paymentsByPayerId).map(([payerId, payments]) =>
        formatPayerPayments(payerId, payments, participants));

    return payerPayments.join('\n');
};

export default toString;
