import * as Rx from 'rx'

let eventCreators = ({
    inputChanged: value => ({
        type: 'INPUT_CHANGED',
        value: value
    })
});

let initEventStreams = () => {
    let eventStreams = {
        inputChanged: new Rx.Subject()
    };

    let eventDispatchers = {
        inputChanged: value => {
            let event = eventCreators.inputChanged(value);
            
            eventStreams.inputChanged.onNext(event);
        }
    };

    return { eventStreams, eventDispatchers };
};

export default initEventStreams;
