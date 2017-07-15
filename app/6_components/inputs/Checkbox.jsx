import React from 'react'

let getNewValue = e => e.target.checked;

let Checkbox = ({ label, checked, disabled, noMargin, onChange }) => {
	let rootStyle = noMargin
		? { margin: '0' }
		: null;
	
	return (
		<div className='checkbox' style={rootStyle}>
			<label>
				<input type='checkbox' checked={checked} disabled={disabled} onChange={e => onChange(getNewValue(e))} /> {label}
			</label>
		</div>
	);
};

export default Checkbox;
