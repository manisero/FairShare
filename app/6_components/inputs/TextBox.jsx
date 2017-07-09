import React from 'react'

class TextBox extends React.Component {
	constructor(props) {
		super(props);
		this.formatValueToDisplay = this.formatValueToDisplay.bind(this);
		this.formatNewValueToReport = this.formatNewValueToReport.bind(this);
		this.focus = this.focus.bind(this);
	}

	formatValueToDisplay(value) {
		return value;
	}

	formatNewValueToReport(newValue) {
		return newValue;
	}

	focus() {
		this.input.focus();
	}

	render() {
		let { label, value, error, onChange } = this.props;

		let rootClass = error == null
			? 'form-group'
			: 'form-group has-error';
		
		let errorElement = error == null
			? null
			: <span className='help-block'>{error}</span>;

		return (
			<div className={rootClass}>
				<label className='control-label'>{label}</label>
				<input
					ref={x => this.input = x}
					type='text'
					value={this.formatValueToDisplay(value)}
					placeholder={label}
					className='form-control'
					onChange={e => onChange(this.formatNewValueToReport(e.target.value))} />
				{errorElement}
			</div>
		);
	}
};

export default TextBox;
