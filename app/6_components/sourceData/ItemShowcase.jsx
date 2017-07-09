import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Money } from 'compUtils'

let ItemShowcase = ({ item }) => (
	<div>
		<div>Name: {item.name}</div>
		<div>Price: <Money amount={item.price} /></div>
	</div>
);

let mapStateToProps = (state, { itemId }) => ({
	item: queries.entityData(state, EntityType.item, itemId)
});

export default connect(mapStateToProps)(ItemShowcase);
