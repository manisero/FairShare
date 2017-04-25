import React from 'react'
import TextBox from './TextBox.jsx'
import Info from './Info.jsx'

var Root = props => (
	<div>
		<TextBox  {...props} />
		<Info {...props} />
	</div>
);

export default Root;
