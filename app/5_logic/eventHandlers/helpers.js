import { ifNull } from 'jsUtils'
import { FocusMode } from 'model'
import queries from 'queries'
import { actions } from 'actions'

let getNextEntityId = (state, entity) => ifNull(queries.entityLastId(state, entity), () => 0) + 1;

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
    actionBatches
};
