const initialParticipantId = 1;
const initialParticipantName = 'Participant1';
const initialParticipantContribution = 100.00;

export default {
	data: {
		participants: {
			lastId: initialParticipantId,
			ids: [ initialParticipantId ],
			items: {
				[initialParticipantId]: {
					participantId: initialParticipantId,
					name: initialParticipantName,
					contribution: initialParticipantContribution
				}
			}
		}
	}
};
