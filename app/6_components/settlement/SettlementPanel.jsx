import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import SettledSettlement from './SettledSettlement.jsx'

let SettlementPanel = ({ isSettled }) => {
    let settlementElement = isSettled
        ? <SettledSettlement />
        : <span className='text-info'>There are no payments to make.</span>

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
