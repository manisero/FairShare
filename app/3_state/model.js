let EntityType = {
    participant: 'participant',
    item: 'item',
    participation: 'participation'
};

let entityConstructors = {
    participant: (name, contribution) => ({ name, contribution }),
    item: (name, price) => ({ name, price }),
    participation: (contribution, participates) => ({ contribution, participates })
};

let entityDefaultConstructors = {
    participant: () => entityConstructors.participant('', 0),
    item: () => entityConstructors.item('', 0),
    participation: () => entityConstructors.participation(0, false)
};

let FocusMode = {
    noFocus: 'noFocus',
    selected: 'selected',
    edited: 'edited',
    deleted: 'deleted'
};

export { EntityType, entityDefaultConstructors, FocusMode };
