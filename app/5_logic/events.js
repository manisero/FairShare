let eventsDataFieldNames = {
	// Participant:
	participantSelected: [ 'participantId' ],
	participantDeselected: [],
	participantsAdd_Started: [],
	participantsAdd_Added: [],
	participantsAdd_Updated: [ 'index', 'updateCommand' ],
	participantsAdd_NextUpdated: [ 'updateCommand' ],
	participantsAdd_Removed: [ 'index' ],
	participantsAdd_Submitted: [],
	participantsAdd_Cancelled: [],
	participantEdit_Started: [ 'participantId' ],
	participantEdit_Updated: [ 'participantId', 'updateCommand' ],
	participantEdit_Submitted: [ 'participantId' ],
	participantEdit_Cancelled: [ 'participantId' ],
	participantDelete_Requested: [ 'participantId' ],
	participantDelete_Rejected: [ 'participantId' ],
	participantDelete_Allowed: [ 'participantId' ],
	participantDelete_Started: [ 'participantId' ],
	participantDelete_Submitted: [ 'participantId' ],
	participantDelete_Cancelled: [ 'participantId' ],
	// Item:
	itemSelected: [ 'itemId' ],
	itemDeselected: [],
	itemAdd_Started: [],
	itemAdd_Updated: [ 'updateCommand' ],
	itemAdd_Submitted: [],
	itemAdd_Cancelled: [],
	itemEdit_Started: [ 'itemId' ],
	itemEdit_Updated: [ 'itemId', 'updateCommand' ],
	itemEdit_Submitted: [ 'itemId' ],
	itemEdit_Cancelled: [ 'itemId' ],
	itemDelete_Started: [ 'itemId' ],
	itemDelete_Submitted: [ 'itemId' ],
	itemDelete_Cancelled: [ 'itemId' ],
	// Participation
	participationEditModeChanged: [ 'mode' ],
	participationAddValidationRequested: [],
	participationEditValidationRequested: [ 'itemId' ],
	participationsValidationRequested: [],
	participationAdd_Updated: [ 'updateCommand' ],
	participationEdit_Updated: [ 'itemId', 'updateCommand' ],
	// Settlement
	settlementRequested: [],
	settlementClipboardCopyRequested: []
};

export default eventsDataFieldNames;
