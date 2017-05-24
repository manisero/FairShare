import React from 'react'
import { connect } from 'reactReduxUtils'
import InputContainer from './InputContainer.jsx'
import AddInputButton from './AddInputButton.jsx'

let Root = ({ inputIds }) => {
	let inputs = inputIds.map(id => (<InputContainer key={id} inputId={id} />));

	return (
		<div>
			{inputs}
			<AddInputButton />
		</div>
	);
};

let mapStateToProps = (state) => ({
    inputIds: state.inputIds
});

export default connect(mapStateToProps)(Root);
