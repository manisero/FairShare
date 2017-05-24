import Rx from 'rxjs/Rx'

let eventCreators = ({

    inputAdded: () => ({
        type: 'INPUT_ADDED'
    }),

    inputChanged: (inputId, value) => ({
        type: 'INPUT_CHANGED',
        inputId,
        value
    })

});

let initEvents = () => {
    let inputAddedStream = new Rx.Subject();
    let inputAddedDispatcher = () => inputAddedStream.next(eventCreators.inputAdded());
    inputAddedDispatcher.stream = inputAddedStream;

    let inputChangedStream = new Rx.Subject();
    let inputChangedDispatcher = (inputId, value) => inputChangedStream.next(eventCreators.inputChanged(inputId, value));
    inputChangedDispatcher.stream = inputChangedStream;

    return {
        inputAdded: inputAddedDispatcher,
        inputChanged: inputChangedDispatcher
    };
};

export default initEvents;
