import React from 'react'
import TextBox from './TextBox.jsx'
import Info from './Info.jsx'

var Root = function(props) {
	return (
		<div>
			<TextBox  {...props} />
			<Info {...props} />
		</div>
	);
};

export default Root;
