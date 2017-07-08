import React from 'react'

let getNewValue = e => e.target.checked;

let Checkbox = props => {
	let rootStyle = props.noMargin
		? { margin: '0' }
		: null;
	
	return (
		<div className='checkbox' style={rootStyle}>
			<label>
				<input type='checkbox' checked={props.checked} disabled={props.disabled} onChange={e => props.onChange(getNewValue(e))} /> {props.label}
			</label>
		</div>
	);
};

export default Checkbox;
