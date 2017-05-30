import Rx from 'rxjs/Rx'

let eventCreators = ({

    inputAdded: () => ({}),

    inputChanged: (inputId, value) => ({
        inputId,
        value
    })

});

let initEvent = (eventType, eventCreator) => {
    let eventStream = new Rx.Subject();
    
    let eventDispatcher = (...args) => {
        eventStream.next({
            type: eventType,
            data: eventCreator.apply(null, args)
        });
    };
    
    eventDispatcher.stream = eventStream;

    return eventDispatcher;
};

let initEvents = () => {
    let events = {};

    Object.keys(eventCreators).forEach(eventType => {
        events[eventType] = initEvent(eventType, eventCreators[eventType]);
    });

    return events;
};

export default initEvents;
