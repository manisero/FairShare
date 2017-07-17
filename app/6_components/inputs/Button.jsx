import React from 'react'

let Button = ({ isSubmit, disabled, tabIndex, onClick, children }) => {
	let type = isSubmit ? 'submit' : 'button';

	let clickHandler = isSubmit
		? e => { onClick(); e.preventDefault(); }
		: _ => onClick();

	return (
		<button type={type} disabled={disabled} className='btn btn-default' tabIndex={tabIndex} onClick={clickHandler}>
			{children}
		</button>
	);
};

export default Button;
