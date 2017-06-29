import React from 'react'
import { connect } from 'reactReduxUtils'

let ItemShowcase = ({ item }) => (
	<div>
		<div>Name: {item.name}</div>
		<div>Price: {item.price}</div>
	</div>
);

let mapStateToProps = (state, { itemId }) => ({
	item: state.data.item.items[itemId] 
});

export default connect(mapStateToProps)(ItemShowcase);
