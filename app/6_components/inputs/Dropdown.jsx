import React from 'react'

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

Dropdown.Option = ({ children, isSelected, onSelect }) => {
    let rootClass = isSelected ? 'active' : null;

    return (
        <li className={rootClass}>
            <a href='#' onClick={e => {onSelect(); e.preventDefault();}}>
                {children}
            </a>
        </li>
    );
};

export default Dropdown;
