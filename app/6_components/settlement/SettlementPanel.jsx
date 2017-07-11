import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import SettledSettlement from './SettledSettlement.jsx'
import UnsettledSettlement from './UnsettledSettlement.jsx'

let SettlementPanel = ({ isSettled }) => {
    let settlementElement = isSettled
        ? <SettledSettlement />
        : <UnsettledSettlement />

    return (
        <div className='panel panel-default'>
            <div className='panel-heading'>
                <h3 className='panel-title'>Settlement</h3>
            </div>
            <div className='panel-body'>
                {settlementElement}
            </div>
        </div>
    );
};

let mapStateToProps = state => ({
    isSettled: queries.entityCount(state, EntityType.payment) != 0
});

export default connect(mapStateToProps)(SettlementPanel);
