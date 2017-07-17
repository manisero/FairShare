let validateItemAdd = (item, state) => validateItem(item, state); 

let validateItemEdit = (itemId, item, state) => validateItem(item, state);


let validateItem = (item, state) => {
	let invalid = false;
	let error = {};

	if (item.name == null || item.name == '') {
		invalid = true;
		error.name = 'Name cannot be empty.'
	}

	if (!(item.price > 0)) {
		invalid = true;
		error.price = 'Price must be greater than 0.'
	}

	return invalid ? error : null;
};

export { validateItemAdd, validateItemEdit };
