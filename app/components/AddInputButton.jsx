import React from 'react'
import { connect } from 'reactReduxUtils'

let AddInputButton = (props) => (
	<button {...props}>
		Add
	</button>
);

let mapEventsToProps = events => ({
	onClick: () => events.inputAdded()
});

export default connect(null, mapEventsToProps)(AddInputButton);
