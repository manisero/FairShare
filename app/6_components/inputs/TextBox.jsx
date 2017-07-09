import React from 'react'

let getNewValue = e => e.target.value;

class TextBox extends React.Component {
	constructor(props) {
		super(props);
		this.focus = this.focus.bind(this);
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
					value={value}
					placeholder={label}
					className='form-control'
					onChange={e => onChange(getNewValue(e))} />
				{errorElement}
			</div>
		);
	}
};

export default TextBox;
