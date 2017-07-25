import React from 'react'
import { safeGet } from 'jsUtils'
import { connect } from 'reactReduxUtils'
import { EntityType } from 'model'
import queries from 'queries'
import { Right } from 'compUtils'
import { Button, ButtonGroup, TextBox, MoneyBox } from 'inputs'
import { ParticipationsAdder, ParticipationsEditor } from '../participation/ParticipationsEditor.jsx'

class ItemEditor extends React.Component {
	componentDidMount() {
		this.nameInput.focus();
	}

	render() {
		let { itemId, item, error, participationsEditorFactory, submitEnabled, onNameChange, onPriceChange, onSubmitClick, onCancelClick } = this.props;

		return (
			<form>
				<div className='form-horizontal'>
					<TextBox ref={x => this.nameInput = x} label='Name' valueString={item.name} error={safeGet(error, 'name')} onChange={x => onNameChange(x)} />
					<MoneyBox label='Price' valueString={item.price_string} initialValue={item.price} error={safeGet(error, 'price')} onChange={x => onPriceChange(x)} />
				</div>
				{participationsEditorFactory(itemId)}
				<Right>
					<ButtonGroup>
						<Button isSubmit onClick={onSubmitClick} disabled={!submitEnabled}>Submit</Button>
						<Button onClick={onCancelClick}>Cancel</Button>
					</ButtonGroup>
				</Right>
			</form>
		);
	}
};

// Adder

let adderFactories = {
	participationsEditor: _ => <ParticipationsAdder />
};

let adderMappings = {
	mapStateToProps: state => {
		let itemError = queries.toAdd_nextError(state, EntityType.item);
		let participationsError = queries.toAdd_nextError(state, EntityType.participation);

		return {
			item: queries.toAdd_next(state, EntityType.item),
			error: itemError,
			participationsEditorFactory: adderFactories.participationsEditor,
			submitEnabled: itemError == null && participationsError == null
		};
	},
	mapEventsToProps: events => ({
		onNameChange: name => events.itemAdd_Updated({ name: { $set: name } }),
		onPriceChange: price => events.itemAdd_Updated({
			price: { $set: price.value },
			price_string: { $set: price.valueString }
		}),
		onSubmitClick: () => events.itemAdd_Submitted(),
		onCancelClick: () => events.itemAdd_Cancelled()
	})
};

let Adder = connect(adderMappings.mapStateToProps, adderMappings.mapEventsToProps)(ItemEditor);

// Editor

let editorFactories = {
	participationsEditor: itemId => <ParticipationsEditor itemId={itemId} />
};

let editorMappings = {
	mapStateToProps: (state, { itemId }) => {
		let { data, error } = queries.edit(state, EntityType.item, itemId);
		let participationsError = queries.edit(state, EntityType.participation, itemId).error;

		return {
			item: data,
			error: error,
			participationsEditorFactory: editorFactories.participationsEditor,
			submitEnabled: error == null && participationsError == null
		}
	},
	mapEventsToProps: (events, { itemId }) => ({
		onNameChange: name => events.itemEdit_Updated(itemId, { name: { $set: name } }),
		onPriceChange: price => events.itemEdit_Updated(itemId, {
			price: { $set: price.value },
			price_string: { $set: price.valueString }
		}),
		onSubmitClick: () => events.itemEdit_Submitted(itemId),
		onCancelClick: () => events.itemEdit_Cancelled(itemId)
	})
};

let Editor = connect(editorMappings.mapStateToProps, editorMappings.mapEventsToProps)(ItemEditor);

export { Adder as ItemAdder, Editor as ItemEditor }
