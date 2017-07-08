import { EntityType } from 'model'
import queries from 'queries'
import settle from 'logic/settlement'

let subscribe = (events, store) => {

    events.settlementRequested.stream
		.subscribe(e => {
            let state = store.getState();
            let items = queries.entityAllData(state, EntityType.item);
            let participations = queries.entityAllData(state, EntityType.participation);

            let settlement = settle(items, participations);
        });

};

export default subscribe;