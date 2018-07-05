const EssaysReducer = (state = {
	data: null,
	new_essay: null,
	list_essay: null,
	selected_essay: null
}, action) => {
	switch (action.type) {
		case 'test':
			state = {
				...state,
				data: action.payload
			}
			break;
		case 'POST_NEW_ESSAY_FULFILLED':
			state = {
				...state,
				new_essay: action.payload
			}
			break;
		case 'LIST_ESSAYS_FULFILLED':
		case 'LIST_ESSAYS':
			state = {
				...state,
				list_essay: action.payload
			}
			break;
		case 'SELETECTED_ESSAY':
			state = {
				...state,
				selected_essay: action.payload
			}
			break;
		default:
			break;
	}
	
	return state;
};

export default EssaysReducer;