import React from 'react'

let Option = ({ children }) => (
    <li><a href='#'>{children}</a></li>
); 

let Dropdown = ({ label, children }) => (
    <div className='dropdown'>
        <button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown'>
            {label} <span className='caret' />
        </button>
        <ul className='dropdown-menu'>
            {children}
        </ul>
    </div>
);

Dropdown.Option = Option;

export default Dropdown;
