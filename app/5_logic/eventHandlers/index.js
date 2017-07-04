import subscribeGeneric from './generic'
import subscribeItem from './item'

let subscribe = (events, store) => {
    subscribeGeneric(events, store);
    subscribeItem(events, store);
};

export default subscribe;
