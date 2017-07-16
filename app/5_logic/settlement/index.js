import copyText from 'utils/copyText'
import { EntityType, entityKeyGetters } from 'model'
import queries from 'queries'
import { actions } from 'actions'
import settle from 'logic/settlement/settle'
import toString from 'logic/settlement/toString'

let subscribe = (events, store) => {

    events.settlementRequested.stream
		.subscribe(e => {
            let state = store.getState();
            let items = queries.entityAllData(state, EntityType.item);
            let participations = queries.entityAllData(state, EntityType.participation);
            
            let payments = settle(items, participations);
            
            let addPaymentActions = payments.map(payment => {
                let id = entityKeyGetters[EntityType.payment](payment);

                return actions.addEntity(EntityType.payment, id, payment, e);
            });

            store.dispatchBatch([
                actions.deleteAllEntities(EntityType.payment, e),
				...addPaymentActions
			], e);
        });
    
    events.settlementClipboardCopyRequested.stream
		.subscribe(e => {
            let state = store.getState();
            let paymentsByPayerId = queries.paymentsByPayerId(state);
            let participants = queries.entityAllData(state, EntityType.participant);

            let settlementText = toString(paymentsByPayerId, participants);
            copyText(settlementText);
        });
    
};

export default subscribe;
