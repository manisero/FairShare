import React from 'react'

let TextBox = props => (
	<div className='form-group'>
		<label>{props.label}</label>
		<input type='text' placeholder={props.label} className='form-control' {...props} />
	</div>
);

export default TextBox;
