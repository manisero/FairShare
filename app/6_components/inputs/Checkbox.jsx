import React from 'react'

let getNewValue = e => e.target.checked;

let Checkbox = props => (
	<div className="checkbox-inline">
		<label>
			<input type="checkbox" {...props} onChange={e => props.onChange(getNewValue(e))} /> {props.label}
		</label>
	</div>
);

export default Checkbox;
