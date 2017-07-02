import update from 'immutability-helper'
import { copyDeep} from 'jsUtils'
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
		.subscribe(e => store.dispatch(actions.setFocus(e.data.entity, e.data.id, FocusMode.selected, e)));
	
	events.entityDeselected.stream
		.subscribe(e => store.dispatch(actions.clearFocus(e.data.entity, e)));

	events.entityAdded.stream
		.subscribe(e => {
			let entity = e.data.entity;
			let id = store.getState().data[entity].lastId + 1;
			let data = entityConstructors[entity]();

			store.dispatchBatch([
				actions.addEntity(entity, id, data, e),
				actions.setEdit(entity, id, data, e),
				actions.setFocus(entity, id, FocusMode.edited, e)
			]);
		});
	
	events.entityEdit_Started.stream
		.subscribe(e => {
			let state = store.getState();
			let { entity, id } = e.data;
			let actionsBatch = [];

			if (state.ui[entity].edit[id] == null) {
                let data = copyDeep(state.data[entity].items[id]);

				actionsBatch.push(actions.setEdit(entity, id, data, e));
            }

			actionsBatch.push(actions.setFocus(entity, id, FocusMode.edited, e));
			store.dispatchBatch(actionsBatch);
		});
	
	events.entityEdit_Updated.stream
		.subscribe(e => {
			let state = store.getState();
			let { entity, id } = e.data;
			let data = state.ui[entity].edit[id];
			let newData = update(data, e.data.updateCommand);
			
			store.dispatch(actions.setEdit(entity, id, newData, e));

			if (validators[entity] != null) {
				let validationError = validators[entity](newData, state);

				if (validationError != null) {
					console.log(validationError);
				}
			}
		});
	
	events.entityEdit_Submitted.stream
		.subscribe(e => {
			let { entity, id } = e.data;
			let data = store.getState().ui[entity].edit[id];

			store.dispatchBatch([
				actions.updateEntity(entity, id, data, e),
				actions.clearFocus(entity, e),
				actions.clearEdit(entity, id, e)
			]);
		});

	events.entityEdit_Cancelled.stream
		.subscribe(e => {
			let { entity, id } = e.data;

			store.dispatchBatch([
				actions.clearFocus(entity, e),
				actions.clearEdit(entity, id, e)
			]);
		});
	
	events.entityDelete_Started.stream
		.subscribe(e => store.dispatch(actions.setFocus(e.data.entity, e.data.id, FocusMode.deleted, e)));
	
	events.entityDelete_Submitted.stream
		.subscribe(e => {
			let { entity, id } = e.data;

			store.dispatchBatch([
				actions.deleteEntity(entity, id, e),
				actions.clearFocus(entity, e),
				actions.clearEdit(entity, id, e)
			]);
		});

	events.entityDelete_Cancelled.stream
		.subscribe(e => store.dispatch(actions.clearFocus(e.data.entity, e)));

};

export { eventDataCreators, subscribe };
