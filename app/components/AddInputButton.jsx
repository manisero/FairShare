import React from 'react'
import { connect } from 'reactReduxUtils'

const style = {
	margin: '15px'
};

let AddInputButton = (props) => (
	<div style={style}>
		<button {...props}>
			Add
		</button>
	</div>
);

let mapEventsToProps = events => ({
	onClick: () => events.inputAdded()
});

export default connect(null, mapEventsToProps)(AddInputButton);
