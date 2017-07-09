import React from 'react'

let Right = ({ children, isNotLast }) => {
    let right = (
        <div className='pull-right'>
            {children}
        </div>
    ); 

    return isNotLast
        ? right
        : <div className='clearfix'>{right}</div>
};

export default Right;
