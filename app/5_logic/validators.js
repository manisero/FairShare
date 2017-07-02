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

export default {
	participant: validateParticipant,
	item: validateItem
};
