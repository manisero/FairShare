import React from 'react'
import TextBox from './TextBox.jsx'

class MoneyBox extends TextBox {

	formatInitialValueToString(value) {
		let valueString = value.toString();

		if (valueString.indexOf('.') === valueString.length -2) {
			// E.g. value is '10.1', let's change it to '10.10'
			valueString += '0';
		}

		return valueString;
	}

	formatNewValueToReport(valueString) {
		valueString = valueString.replace(',', '.');
		
		let value = parseFloat(valueString);
		value = !isNaN(value) ? value : 0;

		return { value, valueString };
	}

};

export default MoneyBox;
