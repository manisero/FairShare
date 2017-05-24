import React from 'react'
import TextBox from './TextBox.jsx'
import Info from './Info.jsx'

const style = {
  margin: '15px'
};

let InputContainer = ({ inputId }) => (
	<div style={style}>
		<div>Id: {inputId}</div>
		<TextBox inputId={inputId} />
		<Info inputId={inputId} />
	</div>
);

export default InputContainer;
