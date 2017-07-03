import { FocusMode } from 'model'

// default Participants

const participant1Id = 1;
const participant1Name = 'Participant1';
const participant1Contribution = 100.00;

const participant2Id = 2;
const participant2Name = 'Participant2';
const participant2Contribution = 200.00;

const participant3Id = 3;
const participant3Name = 'Participant3';
const participant3Contribution = 300.00;

// defaut Items

const item1Id = 1;
const item1Name = 'Item1';
const item1Price = 100.00;

const item2Id = 2;
const item2Name = 'Item2';
const item2Price = 200.00;

const item3Id = 3;
const item3Name = 'Item3';
const item3Price = 300.00;

// state

export default {
	data: {
		participant: {
			lastId: participant3Id,
			ids: [ participant1Id, participant2Id, participant3Id ],
			items: {
				[participant1Id]: {
					name: participant1Name,
					contribution: participant1Contribution
				},
				[participant2Id]: {
					name: participant2Name,
					contribution: participant2Contribution
				},
				[participant3Id]: {
					name: participant3Name,
					contribution: participant3Contribution
				}
			}
		},
		item: {
			lastId: item3Id,
			ids: [ item1Id, item2Id, item3Id ],
			items: {
				[item1Id]: {
					name: item1Name,
					price: item1Price
				},
				[item2Id]: {
					name: item2Name,
					price: item2Price
				},
				[item3Id]: {
					name: item3Name,
					price: item3Price
				}
			}
		},
		participation: {
			items: {
				[item2Id]: {
					[participant1Id]: {
						contribution: item1Price,
						participates: true
					},
					[participant2Id]: {
						contribution: 0,
						participates: true
					}
				}
			}
		}
	},
	ui: {
		participant: {
			focus: {
				itemId: participant1Id,
				mode: FocusMode.edited
			},
			edit: {
				[participant1Id]: {
					data: {
						name: participant1Name + 'a',
						contribution: participant1Contribution + 10
					},
					error: {
						name: '[MOCK] Name is too boring.'
					}
				}
			}
		},
		item: {
			focus: {
				itemId: null,
				mode: null
			},
			edit: { }
		},
		participation: {
			edit: { }
		}
	}
};
