import Rx from 'rxjs/Rx'

let eventCreators = ({

    inputAdded: () => ({
        type: 'INPUT_ADDED'
    }),

    inputChanged: (inputId, value) => ({
        type: 'INPUT_CHANGED',
        inputId,
        value
    })

});

let initEvent = eventCreator => {
    let eventStream = new Rx.Subject();
    let eventDispatcher = (...args) => {
        let event = eventCreator.apply(null, args);
        eventStream.next(event);
    };
    
    eventDispatcher.stream = eventStream;

    return eventDispatcher;
};

let initEvents = () => {
    let events = {};

    Object.keys(eventCreators).forEach(eventName => {
        let eventCreator = eventCreators[eventName];
        events[eventName] = initEvent(eventCreator);
    });

    return events;
};

export default initEvents;
