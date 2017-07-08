let EntityType = {
    participant: 'participant',
    item: 'item',
    participation: 'participation',
    payment: 'payment'
};

let EntityCategory = {
    participant: 'data',
    item: 'data',
    participation: 'data',
    payment: 'settlement'
};

let entityConstructors = {
    participant: (name = '', contribution = 0) => ({ name, contribution }),
    item: (name = '', price = 0) => ({ name, price }),
    participation: (contribution = 0, participates = false) => ({ contribution, participates }),
    payment: (payerId, payeeId, amount = 0) => ({ payerId, payeeId, amount })
};

let FocusMode = {
    noFocus: 'noFocus',
    selected: 'selected',
    edited: 'edited',
    deleted: 'deleted'
};

export { EntityType, EntityCategory, entityConstructors, FocusMode };
