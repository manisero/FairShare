import React from 'react'
import { ParticipantList, ItemList } from './List.jsx'

let Root = () => (
	<div className='container'>
		<div className='row'>
			<div className='col-xs-4'><ParticipantList /></div>
			<div className='col-xs-4'><ItemList /></div>
		</div>
	</div>
);

export default Root;
