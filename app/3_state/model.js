let EntityType = {
    participant: 'participant',
    item: 'item',
    participation: 'participation'
};

let entityConstructors = {
    [EntityType.participant]: () => ({
        name: '',
        contribution: 0
    }),
    [EntityType.item]: () => ({
        name: '',
        price: 0
    }),
    [EntityType.participation]: () => ({
        contribution: 0,
        participates: false
    })
};

let FocusMode = {
    noFocus: 'noFocus',
    selected: 'selected',
    edited: 'edited',
    deleted: 'deleted'
};

export { EntityType, entityConstructors, FocusMode };
