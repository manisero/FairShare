import Rx from 'rxjs/Rx'
import { mapObject } from 'jsUtils'

/*
Assumptions:
- event data object layout: { field1, field2, ..., fieldN }
- event data creator parameters: field1, field2, ..., fieldN
- event creator parameters: [event data creator parameters]
*/

let createEvents = eventsDataFieldNames => mapObject(eventsDataFieldNames, createEventDispatcher);

let createEventDispatcher = (dataFieldNames, eventType) => {
    let eventDataCreator = createEventDataCreator(eventType, dataFieldNames);
    let eventStream = new Rx.Subject();
    
    let eventDispatcher = (...args) => {
        eventStream.next({
            type: eventType,
            data: eventDataCreator(...args)
        });
    };
    
    eventDispatcher.stream = eventStream;

    return eventDispatcher;
};

let createEventDataCreator = (eventType, dataFieldNames) => {
    return (...args) => {
        if (args.length != dataFieldNames.length) {
            throw { message: 'Event data creator was called with wrong arguments.', eventType, creatorParams: dataFieldNames, callArgs: args };
        }

        let eventData = {};

        for (var i = 0; i < dataFieldNames.length; i++) {
            eventData[dataFieldNames[i]] = args[i];
        }

        return eventData;
    };
};

export { createEvents };
