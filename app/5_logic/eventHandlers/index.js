import subscribeGeneric from './generic'
import subscribeParticipant from './participant'
import subscribeItem from './item'

let subscribe = (events, store) => {
    subscribeGeneric(events, store);
    subscribeParticipant(events, store);
    subscribeItem(events, store);
};

export default subscribe;
