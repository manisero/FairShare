import update from 'immutability-helper'
import { ifNull } from 'jsUtils'
import queries from 'queries'
import { actions } from 'actions'
import validators from 'validators'

let getNextEntityId = (state, entity) => ifNull(queries.entityLastId(state, entity), () => 0) + 1;

let handleEntityAddNextUpdated = (state, entity, updateCommand, origin) => {
	let data = queries.toAdd_next(state, entity);

	if (data == null) {
		return [];
	}

	let actionsBatch = [];
	let newData = data;

	if (updateCommand != null) {
		newData = update(data, updateCommand);
		actionsBatch.push(actions.setNextToAdd(entity, newData, origin));
	}

	let newError = validators[entity].add(newData, state);
	
	if (newError != null) {
		actionsBatch.push(actions.setNextToAddError(entity, newError, origin));
	} else {
		let currentError = queries.toAdd_nextError(state, entity);
		
		if (currentError != null) {
			actionsBatch.push(actions.clearNextToAddError(entity, origin));
		}
	}

	return actionsBatch;
};

let handleEntityEditUpdated = (state, entity, id, updateCommand, origin) => {
	let { data, error } = queries.edit(state, entity, id);
	let actionsBatch = [];

	let newData = data;

	if (updateCommand != null) {
		newData = update(data, updateCommand);
		actionsBatch.push(actions.setEdit(entity, id, newData, origin));
	}

	let newError = validators[entity].edit(id, newData, state);

	if (newError != null) {
		actionsBatch.push(actions.setEditError(entity, id, newError, origin));
	} else if (error != null) {
		actionsBatch.push(actions.clearEditError(entity, id, origin));
	}

	return actionsBatch;
};

export {
    getNextEntityId,
	handleEntityAddNextUpdated,
	handleEntityEditUpdated
};
