import React from 'react'

let Button = ({ isSubmit, disabled, tabIndex, onClick, children }) => {
	let type = isSubmit ? 'submit' : 'button'; 

	return (
		<button type={type} disabled={disabled} className='btn btn-default' tabIndex={tabIndex} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
