import React from 'react'

let Error = ({ error }) => {
    if (error == null) {
        return null;
    }

    if (Array.isArray(error)) {
        if (error.length == 0) {
            return null;
        } else if (error.length == 1) {
            return singleError(error);
        } else {
            return errorList(error);
        }
    }

    return singleError(error);
};

let singleError = error => (
    <span className='form-group has-error'>
        <span className='help-block'>{error}</span>
    </span>
);

let errorList = errors => {
    let errorItems = errors.map((x, i) => <li key={i}>{x}</li>);

    return (
        <span className='form-group has-error'>
            <ul className='help-block' style={{paddingLeft: 20}}>
                {errorItems}
            </ul>
        </span>
    );
};

export default Error;
