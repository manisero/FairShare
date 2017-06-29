import React from 'react'

let getNewValue = e => e.target.value;

let TextBox = props => (
	<div className='form-group'>
		<label>{props.label}</label>
		<input type='text' placeholder={props.label} className='form-control' {...props} onChange={e => props.onChange(getNewValue(e))} />
	</div>
);

export default TextBox;
