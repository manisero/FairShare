import { mapObject, setOrUpdate } from 'jsUtils'

let settle = (items, participations) => {
    // TODO: Make sure that every Item has Participation
    let itemDues = calculateItemDues(participations, items);
    let participantContributions = calculateParticipantContributions(participations);
    let participantDues = calculateParticipantDues(participations, itemDues);
    let participantBalances = calculateParticipantBalances(participantContributions, participantDues);
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
        for (let participantId of Object.keys(itemParticipation)) {
            let participation = itemParticipation[participantId];

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

    for (let itemId of Object.keys(participations)) {
        let itemParticipation = participations[itemId];

        for (let participantId of Object.keys(itemParticipation)) {
            let participation = itemParticipation[participantId];

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

    for (let participantId of Object.keys(participantDues)) {
        let due = participantDues[participantId];

        setOrUpdate(balances, participantId,
                    () => -due,
                    val => val - due);
    }

    return balances;
};

export default settle;
