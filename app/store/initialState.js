import { FocusMode } from 'model'

// default Participants

const participant1Id = 1;
const participant1Name = 'Participant1';
const participant1Contribution = 100.00;

const participant2Id = 2;
const participant2Name = 'Participant2';
const participant2Contribution = 200.00;

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
		},
		items: {
			lastId: item3Id,
			ids: [ item1Id, item2Id, item3Id ],
			items: {
				[item1Id]: {
					itemId: item1Id,
					name: item1Name,
					price: item1Price
				},
				[item2Id]: {
					itemId: item2Id,
					name: item2Name,
					price: item2Price
				},
				[item3Id]: {
					itemId: item3Id,
					name: item3Name,
					price: item3Price
				}
			}
		}
	},
	ui: {
		participantFocus: {
			itemId: participant1Id,
			mode: FocusMode.selected
		}, 
		selectedItemId: null
	}
};
