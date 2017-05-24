import React from 'react'
import TextBox from './TextBox.jsx'
import Info from './Info.jsx'
import AddInputButton from './AddInputButton.jsx'

let Root = props => (
	<div>
		<TextBox inputId={1} />
		<Info inputId={1} />
		<AddInputButton />
	</div>
);

export default Root;
