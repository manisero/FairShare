import Rx from 'rxjs/Rx'

let eventCreators = ({
    inputChanged: (inputId, value) => ({
        type: 'INPUT_CHANGED',
        inputId,
        value
    })
});

let initEvents = () => {
    let inputChangedStream = new Rx.Subject();
    let inputChangedDispatcher = (inputId, value) => inputChangedStream.next(eventCreators.inputChanged(inputId, value));
    inputChangedDispatcher.stream = inputChangedStream; 

    return {
        inputChanged: inputChangedDispatcher
    };
};

export default initEvents;
