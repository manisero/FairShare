import Rx from 'rxjs/Rx'

let eventCreators = ({
    inputChanged: value => ({
        type: 'INPUT_CHANGED',
        value: value
    })
});

let initEvents = () => {
    let inputChangedStream = new Rx.Subject();
    let inputChangedDispatcher = value => inputChangedStream.next(eventCreators.inputChanged(value));
    inputChangedDispatcher.stream = inputChangedStream; 

    return {
        inputChanged: inputChangedDispatcher
    };
};

export default initEvents;
