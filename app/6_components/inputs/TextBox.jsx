import React from 'react'

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
		let { label, placeholder, valueString, initialValue, error, onChange } = this.props;

		let rootClass = error == null
			? 'form-group'
			: 'form-group has-error';
		
		let labelElement = label != null
			? <label className='control-label'>{label}</label>
			: null;

		let placeholderValue = placeholder != null ? placeholder : label;

		let value = valueString != null
			? valueString
			: this.formatInitialValueToString(initialValue);

		let errorElement = error == null
			? null
			: <span className='help-block'>{error}</span>;

		return (
			<div className={rootClass}>
				{labelElement}
				<input
					ref={x => this.input = x}
					type='text'
					value={value}
					placeholder={placeholderValue}
					className='form-control'
					onChange={e => onChange(this.formatNewValueToReport(e.target.value))} />
				{errorElement}
			</div>
		);
	}
	
};

export default TextBox;
