import * as Rx from 'rx'

let createEventStream = eventCreator => {
    let stream = new Rx.Subject();

    return {
        stream: stream,
        post: (...args) => {
            stream.onNext(eventCreator(args));
        }
    };
};

let createEventStreams = () => ({
    inputChanged: createEventStream(value => ({
        type: 'INPUT_CHANGED',
        value: value
    })) 
});

export default createEventStreams;
