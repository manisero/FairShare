import React from 'react'
import TextBox from './TextBox.jsx'

class NumberBox extends TextBox {

	formatInitialValueToString(value) {
		return value.toString();
	}

	formatNewValueToReport(valueString) {
		valueString = valueString.replace(',', '.');
		
		let value = parseFloat(valueString);
		value = !isNaN(value) ? value : 0;

		return { value, valueString };
	}

};

export default NumberBox;
