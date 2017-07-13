let eventDataCreators = ({
	// Participant:
	participantSelected: participantId => ({ participantId }),
	participantDeselected: () => ({}),
	participantsAdd_Added: () => ({}),
	participantsAdd_Updated: (index, updateCommand) => ({ index, updateCommand }),
	participantsAdd_NextUpdated: updateCommand => ({ updateCommand }),
	participantsAdd_Removed: index => ({ index }),
	participantsAdd_Submitted: () => ({}),
	participantsAdd_Cancelled: () => ({}),
	participantEdit_Started: participantId => ({ participantId }),
	participantEdit_Updated: (participantId, updateCommand) => ({ participantId, updateCommand }),
	participantEdit_Submitted: participantId => ({ participantId }),
	participantEdit_Cancelled: participantId => ({ participantId }),
	participantDelete_Started: participantId => ({ participantId }),
	participantDelete_Submitted: participantId => ({ participantId }),
	participantDelete_Cancelled: participantId => ({ participantId }),
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
	itemDelete_Cancelled: itemId => ({ itemId }),
	// Settlement
	settlementRequested: () => ({}),
	settlementClipboardCopyRequested: () => ({})
});

export default eventDataCreators;
