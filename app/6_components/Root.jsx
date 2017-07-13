import React from 'react'
import { ParticipantList, ItemList } from './sourceData/List.jsx'
import SettlementPanel from './settlement/SettlementPanel.jsx'
import ParticipantsAdder from './sourceData/ParticipantsAdder.jsx'

let Root = () => (
	<div className='container'>
		<div className='row'>
			<div className='col-xs-12 col-sm-6 col-md-4'><ParticipantList /></div>
			<div className='col-xs-12 col-sm-6 col-md-4'><ItemList /></div>
			<div className='col-xs-12 col-sm-6 col-md-4'><SettlementPanel /></div>
		</div>
		<div className='row'>
			<div className='col-xs-12 col-sm-6 col-md-4'><ParticipantsAdder /></div>
		</div>
	</div>
);

export default Root;
