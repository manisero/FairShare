import queries from 'queries'

let validateParticipations = (participations, state) => {
	let mode  = queries.participationEditMode(state);
	let invalid = false;
	let error = {};

	Object.entries(participations).forEach(([participantId, participation]) => {
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
	});

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

export default validateParticipations;
