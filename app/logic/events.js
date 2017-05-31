import Rx from 'rxjs/Rx'
import { mapObject } from 'jsUtils'

let eventDataCreators = ({

    inputAdded: () => ({}),

    inputChanged: (inputId, value) => ({
        inputId,
        value
    })

});

let createEventDispatcher = (dataCreator, eventType) => {
    let eventStream = new Rx.Subject();
    
    let eventDispatcher = (...args) => {
        eventStream.next({
            type: eventType,
            data: dataCreator.apply(null, args)
        });
    };
    
    eventDispatcher.stream = eventStream;

    return eventDispatcher;
};

let createEvents = () => mapObject(eventDataCreators, createEventDispatcher);

export default createEvents;
