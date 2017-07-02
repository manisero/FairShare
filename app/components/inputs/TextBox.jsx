import React from 'react'

let getNewValue = e => e.target.value;

let TextBox = props => {
	let rootClass = props.error == null
		? 'form-group'
		: 'form-group has-error';
	
	let errorElement = props.error == null
		? null
		: <span className='help-block'>{props.error}</span>;

	return (
		<div className={rootClass}>
			<label className='control-label'>{props.label}</label>
			<input type='text' value={props.value} placeholder={props.label} className='form-control' onChange={e => props.onChange(getNewValue(e))} />
			{errorElement}
		</div>
	);
};

export default TextBox;
