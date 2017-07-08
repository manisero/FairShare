import subscribeParticipant from './participant'
import subscribeItem from './item'
import subscribeSettlement from './settlement'

let subscribe = (events, store) => {
    subscribeParticipant(events, store);
    subscribeItem(events, store);
    subscribeSettlement(events, store);
};

export default subscribe;
