import { setOrUpdate } from 'jsUtils'
import { EntityCategory } from 'model'

export default {
    // entities:
    entityLastId: (state, entity) => state[EntityCategory[entity]][entity].lastId,
    entityIds: (state, entity) => state[EntityCategory[entity]][entity].ids,
    entityAllData: (state, entity) => state[EntityCategory[entity]][entity].items,
    entityData: (state, entity, id) => state[EntityCategory[entity]][entity].items[id],
    entityCount: (state, entity) => state[EntityCategory[entity]][entity].ids.length,
    
    // ui:
    focus: (state, entity) => state.ui[entity].focus,
    toAdd_added: (state, entity) => state.ui[entity].toAdd.items,
    toAdd_next: (state, entity) => state.ui[entity].toAdd.next,
    edit: (state, entity, id) => state.ui[entity].edit[id],
    allEdits: (state, entity) => state.ui[entity].edit,

    // non-generic:

    totalItemsCost: state =>
        Object.values(state.sourceData.item.items)
            .reduce(
                (total, item) => total + item.price,
                0),

    paymentsByPayerId: state => {
        // TODO: Cache query result as it causes constant rerenders of Settlement panel
        let result = {};

        for (var payment of Object.values(state.settlement.payment.items)) {
            setOrUpdate(result, payment.payerId,
                () => ([ payment ]),
                payments => ([ ...payments, payment ]));
        }

        return result;
    }
};
