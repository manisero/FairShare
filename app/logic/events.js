import Rx from 'rxjs/Rx'
import { mapObject } from 'jsUtils'

let eventCreators = ({

    inputAdded: () => ({}),

    inputChanged: (inputId, value) => ({
        inputId,
        value
    })

});

let initEvent = (eventCreator, eventType) => {
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

let initEvents = () => mapObject(eventCreators, initEvent);

export default initEvents;
