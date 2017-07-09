import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Money } from 'compUtils'

let ItemsStats = ({ itemsCount, totalItemsCost }) => (
	<ul className='list-inline text-info'>
		<li>#: {itemsCount}</li>
		<li>|</li>
		<li>Total cost: <Money amount={totalItemsCost} /></li>
	</ul>
);

let mapStateToProps = state => ({
	itemsCount: queries.entityCount(state, EntityType.item),
	totalItemsCost: queries.totalItemsCost(state)
});

export default connect(mapStateToProps)(ItemsStats);
