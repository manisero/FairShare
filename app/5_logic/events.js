let eventDataCreators = ({
	// Generic:
    entitySelected: (entity, id) => ({ entity,id }),
	entityDeselected: entity => ({ entity }),
	entityAdded: entity => ({ entity }),
	entityEdit_Started: (entity, id) => ({ entity, id }),
	entityEdit_Updated: (entity, id, updateCommand) => ({ entity, id, updateCommand }),
	entityEdit_Submitted: (entity, id) => ({ entity, id }),
	entityEdit_Cancelled: (entity, id) => ({ entity, id }),
	entityDelete_Started: (entity, id) => ({ entity, id }),
	entityDelete_Submitted: (entity, id) => ({ entity, id }),
	entityDelete_Cancelled: (entity, id) => ({ entity, id }),
	// Item:
	itemSelected: itemId => ({ itemId }),
	itemDeselected: () => ({}),
	itemAdded: () => ({}),
	itemEdit_Started: itemId => ({ itemId }),
	itemEdit_Updated: (itemId, updateCommand) => ({ itemId, updateCommand }),
	participationEdit_Updated: (itemId, updateCommand) => ({ itemId, updateCommand }),
	itemEdit_Submitted: itemId => ({ itemId }),
	itemEdit_Cancelled: itemId => ({ itemId }),
	itemDelete_Started: itemId => ({ itemId }),
	itemDelete_Submitted: itemId => ({ itemId }),
	itemDelete_Cancelled: itemId => ({ itemId })
});

export default eventDataCreators;
