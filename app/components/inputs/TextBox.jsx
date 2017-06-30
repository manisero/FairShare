import React from 'react'

let getNewValue = e => e.target.value;

let TextBox = props => {
	let rootClass = props.errorMessage == null
		? 'form-group'
		: 'form-group has-error';
	
	let error = props.errorMessage == null
		? null
		: <span className='help-block'>{props.errorMessage}</span>;

	return (
		<div className={rootClass}>
			<label className='control-label'>{props.label}</label>
			<input type='text' value={props.value} placeholder={props.label} className='form-control' onChange={e => props.onChange(getNewValue(e))} />
			{error}
		</div>
	);
};

export default TextBox;
