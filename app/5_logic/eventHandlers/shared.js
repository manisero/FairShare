import update from 'immutability-helper'
import { ifNull } from 'jsUtils'
import queries from 'queries'
import { actions } from 'actions'
import validators from './../validators'

let getNextEntityId = (state, entity) => ifNull(queries.entityLastId(state, entity), () => 0) + 1;

let handleEntityEditUpdated = (state, entity, id, updateCommand, origin) => {
	let { data, error } = queries.edit(state, entity, id);
	let actionsBatch = [];

	let newData = update(data, updateCommand);
	actionsBatch.push(actions.setEdit(entity, id, newData, origin));

	let newError = validators[entity](newData, state);

	if (newError != null) {
		actionsBatch.push(actions.setEditError(entity, id, newError, origin));
	} else if (error != null) {
		actionsBatch.push(actions.clearEditError(entity, id, origin));
	}

	return actionsBatch;
};

export {
    getNextEntityId,
	handleEntityEditUpdated
};
