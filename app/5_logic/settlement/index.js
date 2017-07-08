import { mapObject, setOrUpdate } from 'jsUtils'

let settle = (items, participations) => {
    // TODO: Make sure that every Item has Participation
    let itemDues = calculateItemDues(participations, items);
    let participantContributions = calculateParticipantContributions(participations);
    let participantDues = calculateParticipantDues(participations, itemDues);
    let participantBalances = calculateParticipantBalances(participantContributions, participantDues);
    let { positive: positiveBalances, negative: negativeBalances } = groupParticpantBalances(participantBalances);
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
    let positive = {};
    let negative = {};

    for (let [participantId, balance] of Object.entries(participantBalances)) {
        if (balance > 0) {
            positive[participantId] = balance;
        } else if (balance < 0) {
            negative[participantId] = balance;
        }
    }

    return { positive, negative };
};

export default settle;
