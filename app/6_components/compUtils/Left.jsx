import React from 'react'

let Left = ({ children, isNotLast }) => {
    let left = (
        <div className='pull-left'>
            {children}
        </div>
    ); 

    return isNotLast
        ? left
        : <div className='clearfix'>{left}</div>
};

export default Left;
