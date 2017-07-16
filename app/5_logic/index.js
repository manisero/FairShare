import { createEvents } from 'framework/logic'
import eventsDataFieldNames from './events'
import subscribeParticipant from './participant'
import subscribeItem from './item'
import subscribeSettlement from './settlement'

let initLogic = store => {
	let events = createEvents(eventsDataFieldNames);
	
	subscribeParticipant(events, store);
    subscribeItem(events, store);
    subscribeSettlement(events, store);

	return events;
};

export default initLogic;
