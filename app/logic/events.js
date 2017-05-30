import Rx from 'rxjs/Rx'

let eventCreators = ({

    inputAdded: () => ({}),

    inputChanged: (inputId, value) => ({
        inputId,
        value
    })

});

let initEvent = (eventType) => {
    let eventStream = new Rx.Subject();
    
    let eventDispatcher = (...args) => {
        eventStream.next({
            type: eventType,
            data: eventCreators[eventType].apply(null, args)
        });
    };
    
    eventDispatcher.stream = eventStream;

    return eventDispatcher;
};

let initEvents = () => {
    let events = {};

    Object.keys(eventCreators).forEach(eventType => {
        events[eventType] = initEvent(eventType);
    });

    return events;
};

export default initEvents;
