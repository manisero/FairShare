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
        update(state, { data: { participants: {
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
        
        if (state.ui.editedParticipants[participantId] == null) {
            let participant = copyDeep(state.data.participants.items[participantId]);

            command.ui.editedParticipants = {
                [participantId]: { $set: participant}
            };
        }

        return update(state, command);
    },
    
    editParticipant: (participantId, updateCommand, state) =>
        update(state, { ui: { editedParticipants: { [participantId]: updateCommand } } }),
    
    submitEditingParticipant: state => {
        let participantId = state.ui.participantFocus.itemId;
        let participant = state.ui.editedParticipants[participantId];

        return update(state, {
            data: { participants: { items: { [participantId]: { $set: participant } } } },
            ui: {
                participantFocus: {
                    itemId: { $set: null },
                    mode: { $set: null }
                },
                editedParticipants: { $unset: [ participantId ] }
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
            editedParticipants: { $unset: [ participantId ] }
        } });
    },

    // Item:
    selectItem: (itemId, state) =>
        update(state, { ui: { selectedItemId: { $set: itemId } } }),
    
    addItem: (itemId, state) =>
        update(state, { data: { items: {
            lastId: { $set: itemId },
            ids: { $push: [itemId] },
            items: { [itemId]: { $set: {
                itemId: itemId,
                name: '',
                price: 0
            } } }
        } } }),
    
    updateItem: (itemId, updateCommand, state) =>
        update(state, { data: { items: { items: { [itemId]: updateCommand } } } }),
};

export default stateOperations;
