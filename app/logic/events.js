import Rx from 'rxjs/Rx'

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
            
            eventStreams.inputChanged.next(event);
        }
    };

    return { eventStreams, eventDispatchers };
};

export default initEventStreams;
