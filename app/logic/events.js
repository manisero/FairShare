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
        inputChanged: value => eventStreams.inputChanged.onNext(eventCreators.inputChanged(value)) 
    };

    return { eventStreams, eventDispatchers };
};

export default initEventStreams;
