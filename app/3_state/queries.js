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
    toAdd_next: (state, entity) => state.ui[entity].toAdd.next,
    toAdd_nextError: (state, entity) => state.ui[entity].toAdd.nextError,
    toAdd_added: (state, entity, index) => state.ui[entity].toAdd.items[index],
    toAdd_allAdded: (state, entity) => state.ui[entity].toAdd.items,
    toAdd_addedCount: (state, entity) => state.ui[entity].toAdd.items.length,
    edit: (state, entity, id) => state.ui[entity].edit.items[id],
    allEditIds: (state, entity) => Object.keys(state.ui[entity].edit.items),
    allEdits: (state, entity) => state.ui[entity].edit.items,

    // non-generic:

    totalItemsCost: state =>
        Object.values(state.sourceData.item.items)
            .reduce(
                (total, item) => total + item.price,
                0),
    
    participationEditMode: state => state.ui.participation.editMode,
    participatingParticipantIdsCache: state => state.ui.participation.participatingParticipantIdsCache,

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
