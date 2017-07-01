let EntityType = {
    participant: 'participant',
    item: 'item'
};

let entityConstructors = {
    [EntityType.participant]: () => ({
        name: '',
        contribution: 0
    }),
    [EntityType.item]: () => ({
        name: '',
        price: 0
    })
};

let FocusMode = {
    noFocus: 'noFocus',
    selected: 'selected',
    edited: 'edited',
    deleted: 'deleted'
};

export { EntityType, entityConstructors, FocusMode };
