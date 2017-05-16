import React from 'react'
import { connect } from 'react-redux'

let TextBox = ({ value, valueLength, onInputChange }) => (
	<div>
		<input type='text' value={value} onChange={e => onInputChange(e.target.value)} />
		<div>Length: {valueLength}</div>
	</div>
);

let mapStateToProps = state => ({
    value: state.input.value,
	valueLength: state.input.length 
});

let mapDispatchToProps = (dispatch) => ({
	onInputChange: value => dispatch.events.inputChanged(value)
});

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);
