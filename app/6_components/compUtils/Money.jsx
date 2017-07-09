import React from 'react'

let Money = ({ amount }) => (
    <span>{amount.toFixed(2)}</span>
);

export default Money;
