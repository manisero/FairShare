import React from 'react'
import { connect } from 'react-redux'

let TextBox = ({ value, valueLength, onInputChange }) => (
	<div>
		<input type='text' value={value} onChange={onInputChange} />
		<div>Length: {valueLength}</div>
	</div>
);

let mapStateToProps = state => ({
    value: state.input.value,
	valueLength: state.input.length,
	onInputChange: () => {} // TODO 
});

export default connect(mapStateToProps)(TextBox);
