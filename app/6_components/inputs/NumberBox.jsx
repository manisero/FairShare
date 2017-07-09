import React from 'react'
import TextBox from './TextBox.jsx'

const DecimalSeparator = '.';
const NotSupportedDecimalSeparator = ',';

let parseAndCheckImplicitDecimal = (valueString) => {
	valueString = valueString.replace(NotSupportedDecimalSeparator, DecimalSeparator);

	let value = parseFloat(valueString);
	value = !isNaN(value) ? value : 0;

	let isExplicitDecimal = value % 1 !== 0;
	let isImplicitDecimal = !isExplicitDecimal && valueString.endsWith(DecimalSeparator);

	return { value, isImplicitDecimal };
};

class NumberBox extends TextBox {
	constructor(props) {
		super(props);

		this.state = { isImplicitDecimal: false }; 
	}

	formatValueToDisplay(value) {
		return this.state.isImplicitDecimal
		? '' + value + DecimalSeparator
		: value;
	}

	formatNewValueToReport(newValue) {
		let { value, isImplicitDecimal } = parseAndCheckImplicitDecimal(newValue);

		if (isImplicitDecimal !== this.state.isImplicitDecimal) {
			this.setState({ isImplicitDecimal });
		}

		return value;
	}
};

export default NumberBox;
