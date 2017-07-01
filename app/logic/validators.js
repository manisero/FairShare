let validateParticipant = (participant, state) => {
	let invalid = false;
	let error = {};

	if (participant.name == null || participant.name == 0) {
		invalid = true;
		error.name = 'Name cannot be empty.'
	}

	if (participant.contribution != null && participant.contribution < 0) {
		invalid = true;
		error.contribution = 'Contribution cannot be negative.'
	}

	return invalid ? error : null;
};

export default {
	participant: validateParticipant
};
