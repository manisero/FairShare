import React from 'react'

let getNewValue = e => {
	let value = parseFloat(e.target.value);

	return !isNaN(value) ? value : 0;
}

let NumberBox = props => (
	<div className='form-group'>
		<label>{props.label}</label>
		<input type='number' placeholder={props.label} className='form-control' {...props} onChange={e => props.onChange(getNewValue(e))} />
	</div>
);

export default NumberBox;
