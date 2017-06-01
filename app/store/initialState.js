const participant1Id = 1;
const participant1Name = 'Participant1';
const participant1Contribution = 100.00;

const participant2Id = 2;
const participant2Name = 'Participant2';
const participant2Contribution = 200.00;

export default {
	data: {
		participants: {
			lastId: participant2Id,
			ids: [ participant1Id, participant2Id ],
			items: {
				[participant1Id]: {
					participantId: participant1Id,
					name: participant1Name,
					contribution: participant1Contribution
				},
				[participant2Id]: {
					participantId: participant2Id,
					name: participant2Name,
					contribution: participant2Contribution
				}
			}
		}
	},
	ui: {
		selectedParticipantId: participant1Id,
		selectedItemId: null
	}
};
