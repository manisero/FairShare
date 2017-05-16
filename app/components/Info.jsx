import React from 'react'
import { connect } from 'react-redux'

let Info = ({ inputLength }) => (
	<div>
		Input length: {inputLength}
	</div>
)

let mapStateToProps = state => ({
    inputLength: state.info.inputLength
});

export default connect(mapStateToProps)(Info);
