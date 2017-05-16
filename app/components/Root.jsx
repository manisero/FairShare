import React from 'react'
import TextBox from './TextBox.jsx'
import Info from './Info.jsx'
import InfoCont from './InfoCont'

let Root = props => (
	<div>
		<TextBox {...props} />
		<Info {...props} />
		<InfoCont />
	</div>
);

export default Root;
