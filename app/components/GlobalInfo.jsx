import React from 'react'
import { connect } from 'reactReduxUtils'

const style = {
    margin: '15px'
};

let GlobalInfo = ({ totalLength, averageLength }) => (
    <div style={style}>
        <div>Total length: {totalLength}</div>
        <div>Average length: {averageLength}</div>
    </div>
);

let mapStateToProps = state => state.globalInfo;

export default connect(mapStateToProps)(GlobalInfo);
