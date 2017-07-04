import update from 'immutability-helper'
import { ifNull } from 'jsUtils'
import { FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'
import validators from './../validators'

let getNextEntityId = (state, entity) => ifNull(queries.entityLastId(state, entity), () => 0) + 1;

let handleEntityEditUpdated = (state, entity, id, updateCommand, origin) => {
	let { data, error } = queries.edit(state, entity, id);
	let actionsBatch = [];

	let newData = update(data, updateCommand);
	actionsBatch.push(actions.setEdit(entity, id, newData, origin));

	if (validators[entity] != null) {
		let newError = validators[entity](newData, state);

		if (newError != null) {
			actionsBatch.push(actions.setEditError(entity, id, newError, origin));
		} else if (error != null) {
			actionsBatch.push(actions.clearEditError(entity, id, origin));
		}
	}

	return actionsBatch;
};

let actionBatches = {
	entityAdded: (state, entity, id, data, origin) => {
		return [
			actions.addEntity(entity, id, data, origin),
			actions.setEdit(entity, id, data, origin),
			actions.setFocus(entity, id, FocusMode.edited, origin)
		];
	},
	entityEdit_Submitted: (state, entity, id, origin) => {
		let { data, error } = queries.edit(state, entity, id);

		if (error != null) {
			return;
		}

		return [
			actions.updateEntity(entity, id, data, origin),
			actions.clearFocus(entity, origin),
			actions.clearEdit(entity, id, origin)
		];
	},
	entityEdit_Cancelled: (entity, origin) => [
		actions.clearFocus(entity, origin),
		actions.clearEdit(entity, origin)
	]
};

export {
    getNextEntityId,
	handleEntityEditUpdated,
    actionBatches
};
