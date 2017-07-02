import React from 'react'

let getNewValue = e => {
	let value = parseFloat(e.target.value);

	return !isNaN(value) ? value : 0;
}

let NumberBox = props => {
	let rootClass = props.error == null
		? 'form-group'
		: 'form-group has-error';
	
	let rootStyle = props.noMargin
		? { margin: '0' }
		: null;

	let errorElement = props.error == null
		? null
		: <span className='help-block'>{props.error}</span>;

	return (
		<div className={rootClass} style={rootStyle}>
			<label className='control-label'>{props.label}</label>
			<input type='number' value={props.value} placeholder={props.label} className='form-control' onChange={e => props.onChange(getNewValue(e))} />
			{errorElement}
		</div>
	);
};

export default NumberBox;
