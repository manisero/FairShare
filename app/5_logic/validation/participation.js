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
    let generalErrors = [];

    if (mode === ParticipationMode.even) {
        validateGeneralContributed(participations, generalErrors);
    } else {
        validateGeneralContribution(participations, item, generalErrors);
        validateContribution(participations, error);
    }

    validateGeneralParticipates(participations, generalErrors);

    if (generalErrors.length != 0) {
        error._general = generalErrors;
    }

	return Object.keys(error).length > 0 ? error : null;
};

let validateGeneralContributed = (participations, errors) => {
    let anyoneContributed = Object.values(participations).some(x => x.contributed);

    if (!anyoneContributed) {
        errors.push('Someone must have paid for the item.');
    }
};

let validateGeneralContribution = (participations, item, errors) => {
    let totalContribution = Object.values(participations)
        .filter(x => x.contribution > 0)
        .map(x => x.contribution)
        .reduce(
            (x, y) => x + y,
            0);
    
    if (totalContribution == 0) {
        errors.push('Someone must have paid for the item.');
    } else if (totalContribution < item.price) {
        errors.push('Total contribution is less than item price.');
    } else if (totalContribution > item.price) {
        errors.push('Total contribution is greater than item price.');
    }
};

let validateGeneralParticipates = (participations, errors) => {
    let anyoneParticipates = Object.values(participations).some(x => x.participates)

    if (!anyoneParticipates) {
        errors.push('Someone must participate in item settlement.');
    }
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

export { validateParticipationsAdd, validateParticipationsEdit };
