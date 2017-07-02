import React from 'react'
import { EntityType } from 'model'
import queries from 'queries'
import { connect } from 'reactReduxUtils'

let ItemShowcase = ({ item }) => (
	<div>
		<div>Name: {item.name}</div>
		<div>Price: {item.price}</div>
	</div>
);

let mapStateToProps = (state, { itemId }) => ({
	item: queries.entityData(state, EntityType.item, itemId)
});

export default connect(mapStateToProps)(ItemShowcase);
