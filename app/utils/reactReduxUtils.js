import { connect as reactReduxConnect } from 'react-redux'

let enableEventsInDispatchMapping = (events, reduxStore) => reduxStore.dispatch.events = events;

let connect = (mapStateToProps, mapEventsToProps) => {
    let mapDispatchToProps = dispatch => mapEventsToProps(dispatch.events);

    return reactReduxConnect(mapStateToProps, mapDispatchToProps);
};

export { enableEventsInDispatchMapping, connect };
