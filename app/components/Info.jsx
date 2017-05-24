import React from 'react'
import { connect } from 'reactReduxUtils'

let Info = ({ inputId, inputLength }) => (
	<div>
		Input length: {inputLength}
	</div>
);

let mapStateToProps = (state, { inputId }) => ({
    inputLength: state.inputs[inputId].info.inputLength
});

export default connect(mapStateToProps)(Info);
