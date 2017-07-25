import React from 'react'
import { Error } from 'compUtils'

class TextBox extends React.Component {
	constructor(props) {
		super(props);
		this.formatInitialValueToString = this.formatInitialValueToString.bind(this);
		this.formatNewValueToReport = this.formatNewValueToReport.bind(this);
		this.focus = this.focus.bind(this);
	}

	formatInitialValueToString(value) {
		return valueString;
	}

	formatNewValueToReport(valueString) {
		return valueString;
	}

	focus() {
		this.input.focus();
	}

	render() {
		let { label, placeholder, valueString, initialValue, error, noMargin, onChange } = this.props;

		let rootClass = error == null
			? 'form-group'
			: 'form-group has-error';
		
		let rootStyle = noMargin
			? { marginBottom: 0 }
			: null;
		
		let labelElement = label != null
			? <label className='control-label col-xs-4'>{label}</label>
			: null;
		
		let inputDivClassName = label != null
			? 'col-xs-8'
			: 'col-xs-12';

		let placeholderValue = placeholder != null ? placeholder : label;

		let value = valueString != null
			? valueString
			: this.formatInitialValueToString(initialValue);

		let errorElement = error == null
			? null
			: <span className='col-xs-12'><Error error={error} /></span>;

		return (
			<div className={rootClass} style={rootStyle}>
				{labelElement}
				<div className={inputDivClassName}>
					<input
						ref={x => this.input = x}
						type='text'
						value={value}
						placeholder={placeholderValue}
						className='form-control'
						onChange={e => onChange(this.formatNewValueToReport(e.target.value))} />
				</div>
				{errorElement}
			</div>
		);
	}
};

export default TextBox;
