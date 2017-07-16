import { mapObject } from 'jsUtils'
import { ParticipationMode } from 'model'
import { actions } from 'actions'

let mapParticipationEditToEntity = (item, participationEdit, participationMode) => {
	if (participationMode === ParticipationMode.even) {
		let filteredParticipation = mapObject(
			participationEdit,
			participation => (participation.contributed || participation.participates) ? participation : undefined);

		let contributingParticipantsCount = Object.values(filteredParticipation).filter(x => x.contributed).length;
		let contribution = item.price / contributingParticipantsCount;
		let result = {};

		for (let [participantId, participation] of Object.entries(filteredParticipation)) {
			result[participantId] = {
				contribution: participation.contributed ? contribution : 0,
				participates: participation.participates
			};
		}

		return result;
	} else {
		let result = {};
	
		for (let [participantId, participation] of Object.entries(participationEdit)) {
			if (participation.contribution > 0 || participation.participates) {
				result[participantId] = {
					contribution: participation.contribution,
					participates: participation.participates
				};
			}
		}

		return result;
	}
};

let handleParticipatingParticipantIdsChange = (itemParticipations, origin) => {
	let participantIds = Object.entries(itemParticipations)
		.filter(([participantId, participation]) => participation.participates)
		.map(([participantId, _]) => parseInt(participantId));
	
	return [
		actions.setParticipatingParticipantIdsCache(participantIds, origin)
	];
}

export { mapParticipationEditToEntity, handleParticipatingParticipantIdsChange };
