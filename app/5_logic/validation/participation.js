import { ParticipationMode } from 'model'
import queries from 'queries'

let validateParticipations = (participations, state) => {
	let mode  = queries.participationEditMode(state);
	let error = {};

    if (mode === ParticipationMode.even) {
        validateGeneralForEven(participations, error);
    } else {
        validateContribution(participations, error);
        validateGeneralForUnven(participations, error);
    }

	return Object.keys(error).length > 0 ? error : null;
};

let validateContribution = (participations, error) => {
	Object.entries(participations).forEach(([participantId, participation]) => {
		if (participation.contribution != null && participation.contribution < 0) {
			error[participantId] = {
                contribution: 'Contribution cannot be negative.'
            };
		}
	});
};

let validateGeneralForEven = (participations, error) => {
    let errors = [];

    let anyoneContributed = Object.values(participations)
        .map(x => x.contributed)
        .reduce((x, y) => x || y);

    if (!anyoneContributed) {
        errors.push('Someone must have paid for the item.');
    }

    let anyoneParticipates = Object.values(participations)
        .map(x => x.participates)
        .reduce((x, y) => x || y);

    if (!anyoneParticipates) {
        errors.push('Someone must participate in item settlement.');
    }

    if (errors.length != 0) {
        error._general = errors;
    }
};

let validateGeneralForUnven = (participations, error) => {
    let errors = [];

    let anyoneContributed = Object.values(participations)
        .map(x => x.contribution > 0)
        .reduce((x, y) => x || y);
    
    if (!anyoneContributed) {
        errors.push('Someone must have paid for the item.');
    }

    let anyoneParticipates = Object.values(participations)
        .map(x => x.participates)
        .reduce((x, y) => x || y);

    if (!anyoneParticipates) {
        errors.push('Someone must participate in item settlement.');
    }

    if (errors.length != 0) {
        error._general = errors;
    }
};

export default validateParticipations;
