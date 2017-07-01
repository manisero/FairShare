import update from 'immutability-helper'
import { EntityType, entityConstructors, FocusMode } from 'model'
import { actions } from 'actions'
import validators from './validators'

let eventDataCreators = ({
    entitySelected: (entity, id) => ({ entity,id }),
	entityDeselected: entity => ({ entity }),
	entityAdded: entity => ({ entity }),
	entityEdit_Started: (entity, id) => ({ entity, id }),
	entityEdit_Updated: (entity, id, updateCommand) => ({ entity, id, updateCommand }),
	entityEdit_Submitted: (entity, id) => ({ entity, id }),
	entityEdit_Cancelled: (entity, id) => ({ entity, id }),
	entityDelete_Started: (entity, id) => ({ entity, id }),
	entityDelete_Submitted: (entity, id) => ({ entity, id }),
	entityDelete_Cancelled: (entity, id) => ({ entity, id })
});

let subscribe = (events, store) => {
	
	events.entitySelected.stream
		.subscribe(e => store.dispatch(actions.selectEntity(e.data.entity, e.data.id, e)));
	
	events.entityDeselected.stream
		.subscribe(e => store.dispatch(actions.deselectEntity(e.data.entity, e)));

	events.entityAdded.stream
		.subscribe(e => {
			let entity = e.data.entity;
			let id = store.getState().data[entity].lastId + 1;
			let data = entityConstructors[entity]();

			store.dispatchBatch(
				actions.addEntity(entity, id, data, e),
				actions.setEdit(entity, id, data, e),
				actions.setFocus(entity, id, FocusMode.edited, e)
			);
		});
	
	events.entityEdit_Started.stream
		.subscribe(e => store.dispatch(actions.editEntity_start(e.data.entity, e.data.id, e)));
	
	events.entityEdit_Updated.stream
		.subscribe(e => {
			let state = store.getState();
			let entity = e.data.entity;
			let id = e.data.id;
			let item = state.ui[entity].edit[id];
			let newItem = update(item, e.data.updateCommand);
			
			store.dispatch(actions.editEntity_update(entity, id, newItem, e));

			if (validators[entity] != null) {
				let validationError = validators[entity](newItem, state);

				if (validationError != null) {
					console.log(validationError);
				}
			}
		});
	
	events.entityEdit_Submitted.stream
		.subscribe(e => store.dispatch(actions.editEntity_submitFocused(e.data.entity, e)));

	events.entityEdit_Cancelled.stream
		.subscribe(e => store.dispatch(actions.editEntity_cancelFocused(e.data.entity, e)));
	
	events.entityDelete_Started.stream
		.subscribe(e => store.dispatch(actions.deleteEntity_start(e.data.entity, e.data.id, e)));
	
	events.entityDelete_Submitted.stream
		.subscribe(e => store.dispatch(actions.deleteEntity_submitFocused(e.data.entity, e)));

	events.entityDelete_Cancelled.stream
		.subscribe(e => store.dispatch(actions.deleteEntity_cancelFocused(e.data.entity, e)));

};

export { eventDataCreators, subscribe };
