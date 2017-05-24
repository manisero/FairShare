import React from 'react'
import { connect } from 'reactReduxUtils'

let TextBox = ({ value, onInputChange }) => (
	<div>
		<input type='text' value={value} onChange={e => onInputChange(e.target.value)} />
		<div>Length: {value.length}</div>
	</div>
);

let mapStateToProps = state => ({
    value: state.input.value
});

let mapEventsToProps = (events) => ({
	onInputChange: value => events.inputChanged(value)
});

export default connect(mapStateToProps, mapEventsToProps)(TextBox);
