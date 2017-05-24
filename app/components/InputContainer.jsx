import React from 'react'
import TextBox from './TextBox.jsx'
import Info from './Info.jsx'

let InputContainer = ({ inputId }) => (
	<div>
		<TextBox inputId={inputId} />
		<Info inputId={inputId} />
	</div>
);

export default InputContainer;
