import { EntityType, ParticipationMode } from 'model'
import queries from 'queries'

let validateParticipationsAdd = (participations, state) => {
    let item = queries.toAdd_next(state, EntityType.item);
    let mode = queries.participationEditMode(state);

    return validateParticipations(participations, item, mode);
};

let validateParticipationsEdit = (itemId, participations, state) => {
    let item = queries.edit(state, EntityType.item, itemId).data;
    let mode = queries.participationEditMode(state);

    return validateParticipations(participations, item, mode);
};

let validateParticipations = (participations, item, mode) => {
	let error = {};

    if (mode === ParticipationMode.even) {
        validateGeneralForEven(participations, item, error);
    } else {
        validateContribution(participations, error);
        validateGeneralForUnven(participations, item, error);
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

let validateGeneralForEven = (participations, item, error) => {
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

let validateGeneralForUnven = (participations, item, error) => {
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

export { validateParticipationsAdd, validateParticipationsEdit };
