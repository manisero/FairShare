let validateParticipantAdd = (participant, state) => validateParticipant(participant, state); 

let validateParticipantEdit = (participantId, participant, state) => validateParticipant(participant, state);

let validateParticipant = (participant, state) => {
	let invalid = false;
	let error = {};

	if (participant.name == null || participant.name == '') {
		invalid = true;
		error.name = 'Name cannot be empty.'
	}

	if (participant.contribution != null && participant.contribution < 0) {
		invalid = true;
		error.contribution = 'Contribution cannot be negative.'
	}

	return invalid ? error : null;
};

export { validateParticipantAdd, validateParticipantEdit };
