import update from 'immutability-helper'
import { copyDeep} from 'jsUtils'
import { FocusMode } from 'model'

let stateOperations = {

    // Participant:
    selectParticipant: (participantId, state) =>
        update(state, { ui: { participantFocus: {
            itemId: { $set: participantId },
            mode: { $set: FocusMode.selected }
        } } }),
    
    addParticipant: (participantId, state) =>
        update(state, { data: { participant: {
            lastId: { $set: participantId },
            ids: { $push: [participantId] },
            items: { [participantId]: { $set: {
                participantId: participantId,
                name: '',
                contribution: 0
            } } }
        } } }),
    
    startEditingParticipant: (participantId, state) => {
        let command = { ui: { participantFocus: {
            itemId: { $set: participantId },
            mode: { $set: FocusMode.edited }
        } } };
        
        if (state.ui.editedParticipant[participantId] == null) {
            let participant = copyDeep(state.data.participant.items[participantId]);

            command.ui.editedParticipant = {
                [participantId]: { $set: participant}
            };
        }

        return update(state, command);
    },
    
    editParticipant: (participantId, updateCommand, state) =>
        update(state, { ui: { editedParticipant: { [participantId]: updateCommand } } }),
    
    submitEditingParticipant: state => {
        let participantId = state.ui.participantFocus.itemId;
        let participant = state.ui.editedParticipant[participantId];

        return update(state, {
            data: { participant: { items: { [participantId]: { $set: participant } } } },
            ui: {
                participantFocus: {
                    itemId: { $set: null },
                    mode: { $set: null }
                },
                editedParticipant: { $unset: [ participantId ] }
            }
        });
    },

    cancelEditingParticipant: state => {
        let participantId = state.ui.participantFocus.itemId;

        return update(state, { ui: {
            participantFocus: {
                itemId: { $set: null },
                mode: { $set: null }
            },
            editedParticipant: { $unset: [ participantId ] }
        } });
    },

    startDeletingParticipant: (participantId, state) =>
        update(state, { ui: { participantFocus: {
            itemId: { $set: participantId },
            mode: { $set: FocusMode.deleted }
        } } }),
    
    submitDeletingParticipant: state => {
        let participantId = state.ui.participantFocus.itemId;
        let idIndex = state.data.participant.ids.indexOf(participantId);

        return update(state, {
            data: { participant: {
                ids: { $splice: [[ idIndex, 1 ]] },
                items: { $unset: [participantId] }
            } },
            ui: {
                participantFocus: {
                    itemId: { $set: null },
                    mode: { $set: null }
                },
                editedParticipant: { $unset: [ participantId ] }
            }
        });
    },
    
    cancelDeletingParticipant: state => {
        let participantId = state.ui.participantFocus.itemId;

        return update(state, { ui: {
            participantFocus: {
                itemId: { $set: null },
                mode: { $set: null }
            }
        } });
    },

    // Item:
    selectItem: (itemId, state) =>
        update(state, { ui: { selectedItemId: { $set: itemId } } }),
    
    addItem: (itemId, state) =>
        update(state, { data: { item: {
            lastId: { $set: itemId },
            ids: { $push: [itemId] },
            items: { [itemId]: { $set: {
                itemId: itemId,
                name: '',
                price: 0
            } } }
        } } }),
    
    updateItem: (itemId, updateCommand, state) =>
        update(state, { data: { item: { items: { [itemId]: updateCommand } } } }),
};

export default stateOperations;
