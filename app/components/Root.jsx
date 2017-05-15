import React from 'react'
import TextBox from './TextBox.jsx'
import Info from './Info.jsx'

let Root = props => (
	<div>
		<TextBox  {...props} />
		<Info {...props} />
	</div>
);

export default Root;
