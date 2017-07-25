import React from 'react'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Button } from 'inputs'
import ParticipantAdder from './ParticipantAdder.jsx'

class NextParticipant extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddClick = this.handleAddClick.bind(this);
	}

	componentDidMount() {
		console.log('a');
		this.adder.focus();
	}

	handleAddClick() {
		this.props.onAddClick();
		this.adder.focus();
	}

	render() {
		let { participant, onAddClick, onNameChange } = this.props;
		
		return (
			<form>
				<ParticipantAdder ref={x => this.adder = x} participant={participant} onNameChange={val => onNameChange(val)}>
					<Button isSubmit onClick={this.handleAddClick}>Add</Button>
				</ParticipantAdder>
			</form>
		);
	}
};

let mapStateToProps = state => ({
	participant: queries.toAdd_next(state, EntityType.participant)
});

let mapEventsToProps = events => ({
	onAddClick: () => events.participantsAdd_Added(),
	onNameChange: name => events.participantsAdd_NextUpdated({ name: { $set: name } })
});

export default connect(mapStateToProps, mapEventsToProps)(NextParticipant);
