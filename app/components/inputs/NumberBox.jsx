import React from 'react'

let NumberBox = props => (
	<div className='form-group'>
		<label>{props.label}</label>
		<input type='number' placeholder={props.label} className='form-control' {...props} />
	</div>
);

export default NumberBox;
