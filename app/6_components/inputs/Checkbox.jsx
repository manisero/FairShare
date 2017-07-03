import React from 'react'

let getNewValue = e => e.target.checked;

let Checkbox = props => (
	<div className='checkbox'>
		<label>
			<input type='checkbox' checked={props.checked} onChange={e => props.onChange(getNewValue(e))} /> {props.label}
		</label>
	</div>
);

export default Checkbox;
