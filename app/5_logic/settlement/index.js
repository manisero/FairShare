import { mapObject, setOrUpdate } from 'jsUtils'

let settle = (items, participations) => {
    // TODO: Make sure that every Item has Participation
    let itemDues = calculateItemDues(participations, items);
    let participantContributions = calculateParticipantContributions(participations);
    let participantDues = calculateParticipantDues(participations, itemDues);
    let participantBalances = calculateParticipantBalances(participantContributions, participantDues);
    let { overpayments, overdues } = groupParticpantBalances(participantBalances);
    let payments = calculatePayments(overpayments, overdues);

    return payments;
};

let calculateItemDues = (participations, items) =>
    mapObject(participations, (itemParticipation, itemId) => {
        let itemParticipantsCount = Object.values(itemParticipation)
            .filter(x => x.participates)
            .length;
        
        return items[itemId].price / itemParticipantsCount;
});

let calculateParticipantContributions = participations => {
    let contributions = {};

    for (let itemParticipation of Object.values(participations)) {
        for (let [participantId, participation] of Object.entries(itemParticipation)) {
            if (participation.contribution != 0) {
                setOrUpdate(contributions, participantId,
                    () => participation.contribution,
                    val => val + participation.contribution);
            }
        }
    }

    return contributions;
};

let calculateParticipantDues = (participations, itemDues) => {
    let dues = {};

    for (let [itemId, itemParticipation] of Object.entries(participations)) {
        for (let [participantId, participation] of Object.entries(itemParticipation)) {
            if (participation.participates) {
                let due = itemDues[itemId];

                setOrUpdate(dues, participantId,
                    () => due,
                    val => val + due);
            }
        }
    }

    return dues;
};

let calculateParticipantBalances = (participantContributions, participantDues) => {
    let balances = Object.assign({}, participantContributions);

    for (let [participantId, due] of Object.entries(participantDues)) {
        setOrUpdate(balances, participantId,
                    () => -due,
                    val => val - due);
    }

    return balances;
};

let groupParticpantBalances = participantBalances => {
    let overpayments = {};
    let overdues = {};

    for (let [participantId, balance] of Object.entries(participantBalances)) {
        if (balance > 0) {
            overpayments[participantId] = balance;
        } else if (balance < 0) {
            overdues[participantId] = -balance;
        }
    }

    return { overpayments, overdues };
};

let calculatePayments = (overpayments, overdues) => {
    let payeesQueue = Object.entries(overpayments).map(
        ([payeeId, overpayment]) => ({ payeeId, overpayment }));
    
    let payeeIndex = 0;
    let payments = [];
    
    for (let [payerId, overdue] of Object.entries(overdues)) {
        while (overdue > 0 && payeeIndex < payeesQueue.length) {
            let payee = payeesQueue[payeeIndex];
            let payeeId = payee.payeeId;

            let amount = Math.min(overdue, payee.overpayment);
            overdue -= amount;
            payee.overpayment -= amount;

            payments.push({ payerId, payeeId, amount });

            if (payee.overpayment <= 0) {
                payeeIndex++;
            }
        }
    }

    // TODO: Handle remaining overdues / overpayments
    return payments;
};

export default settle;
