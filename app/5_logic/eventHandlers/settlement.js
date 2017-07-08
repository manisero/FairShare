let subscribe = (events, store) => {

    events.settlementRequested.stream
		.subscribe(e => console.log('settlement'));

};

export default subscribe;
