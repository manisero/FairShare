import { connect } from 'react-redux'

let enableEventsInDispatchMapping = (events, reduxStore) => reduxStore.dispatch.events = events;

let connect = 'TODO';

export { enableEventsInDispatchMapping, connect };
