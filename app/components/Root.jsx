import React from 'react'
import TextBox from './TextBox.jsx'
import TextBox2 from './TextBox2.jsx'
import Info from './Info.jsx'

let Root = props => (
	<div>
		<TextBox {...props} />
		<TextBox2 />
		<Info />
	</div>
);

export default Root;
