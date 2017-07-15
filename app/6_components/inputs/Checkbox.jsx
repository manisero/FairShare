import React from 'react'

let getNewValue = e => e.target.checked;

let Checkbox = ({ label, checked, disabled, noMargin, smallMargin, onChange }) => {
	let rootStyle = noMargin
		? { marginTop: 0, marginBottom: 0 }
		: (smallMargin ? { marginTop: 7, marginBottom: 7 } : null);
	
	return (
		<div className='checkbox' style={rootStyle}>
			<label>
				<input type='checkbox' checked={checked} disabled={disabled} onChange={e => onChange(getNewValue(e))} /> {label}
			</label>
		</div>
	);
};

export default Checkbox;
