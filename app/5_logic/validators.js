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

let validateItem = (item, state) => {
	let invalid = false;
	let error = {};

	if (item.name == null || item.name == '') {
		invalid = true;
		error.name = 'Name cannot be empty.'
	}

	if (item.price != null && item.price < 0) {
		invalid = true;
		error.price = 'Price cannot be negative.'
	}

	return invalid ? error : null;
};

let validateParticipations = (participations, state) => {
	let invalid = false;
	let error = {};

	Object.keys(participations).forEach(
		participantId => {
			let participation = participations[participantId];
			let innerInvalid = false;
			let innerError = {};

			if (participation.contribution != null && participation.contribution < 0) {
				innerInvalid = true;
				innerError.contribution = 'Contribution cannot be negative.'
			}

			if (innerInvalid) {
				invalid = true;
				error[participantId] = innerError;
			}
		}
	);

	return invalid ? error : null;
};

export default {
	participant: validateParticipant,
	item: validateItem,
	participation: validateParticipations
};
