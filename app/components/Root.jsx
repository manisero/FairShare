import React from 'react'
import { connect } from 'reactReduxUtils'
import InputContainer from './InputContainer.jsx'
import AddInputButton from './AddInputButton.jsx'
import GlobalInfo from './GlobalInfo.jsx'

let Root = ({ inputIds }) => {
	let inputs = inputIds.map(id => (<InputContainer key={id} inputId={id} />));

	return (
		<div>
			{inputs}
			<AddInputButton />
			<GlobalInfo />
		</div>
	);
};

let mapStateToProps = (state) => ({
    inputIds: state.inputIds
});

export default connect(mapStateToProps)(Root);
