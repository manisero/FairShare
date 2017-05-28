import Rx from 'rxjs/Rx'

let eventCreators = ({

    inputAdded: () => ({}),

    inputChanged: (inputId, value) => ({
        inputId,
        value
    })

});

// TODO:
// Consider the following event structure: { type: 'inputChanged', payload: { inputId: 1, value: 'a' } }.
// This way eventDispatcher won't modify object returned by eventCreator

let initEvent = (eventName, eventCreator) => {
    let eventStream = new Rx.Subject();
    let eventDispatcher = (...args) => {
        let event = eventCreator.apply(null, args);
        event.type = eventName;

        eventStream.next(event);
    };
    
    eventDispatcher.stream = eventStream;

    return eventDispatcher;
};

let initEvents = () => {
    let events = {};

    Object.keys(eventCreators).forEach(eventName => {
        let eventCreator = eventCreators[eventName];
        events[eventName] = initEvent(eventName, eventCreator);
    });

    return events;
};

export default initEvents;
