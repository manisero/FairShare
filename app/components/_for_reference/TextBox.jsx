import React from 'react'
import { connect } from 'reactReduxUtils'

// TODO: Remove this, as this was left only for reference

let TextBox = ({ inputId, value, onInputChange }) => (
	<div>
		<input type='text' value={value} onChange={e => onInputChange(e.target.value)} />
		<div>Length: {value.length}</div>
	</div>
);

let mapStateToProps = (state, { inputId }) => ({
    value: state.inputs[inputId].input.value
});

let mapEventsToProps = (events, { inputId }) => ({
	onInputChange: value => events.inputChanged(inputId, value)
});

export default connect(mapStateToProps, mapEventsToProps)(TextBox);
