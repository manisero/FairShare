import Rx from 'rxjs/Rx'
import { mapObject } from 'jsUtils'

let eventDataCreators = ({
    participantSelected: participantId => ({ participantId }),
    participantEdited: (participantId, name, contribution) => ({ participantId, name, contribution })
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
