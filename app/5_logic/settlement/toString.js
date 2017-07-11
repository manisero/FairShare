let formatParticipant = participant => participant != null
    ? participant.name
    : '[Unknown]';

let formatPayerPayments = (payerId, payments, participants) => {
    return formatParticipant(participants[payerId]);
};

let toString = (paymentsByPayerId, participants) => {
    let payerPayments = Object.entries(paymentsByPayerId).map(([payerId, payments]) =>
        formatPayerPayments(payerId, payments, participants));

    return payerPayments.join('\n');
};

export default toString;
