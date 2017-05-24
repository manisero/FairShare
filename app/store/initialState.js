const initialInputId = 1;
const initialInputValue = 'test';

export default {
	lastInputId: initialInputId,
	inputIds: [ initialInputId ],
	inputs: {
		[initialInputId]: {
			input: {
				value: initialInputValue
			},
			info: {
				inputLength: initialInputValue.length
			}
		}
	},
	globalInfo: {
		totalLength: initialInputValue.length,
		averageLength: initialInputValue.length
	}
};
