const MyReducer = (state = {
	date: '2018-02-22',
	error: '',
	data: {},
	edit: {}
}, action) => {
	let obj = null;
	switch (action.type) {
		case 'CHANGE_DATE':
			state = {
				...state,
				date: action.payload
			}
			break;
		case 'CHANGE_ERROR':
			state = {
				...state,
				error: action.payload
			}
			break;
		case 'CHANGE_DATA':
			obj = {...state.data};
			obj[action.key] = action.payload;
			localStorage.setItem('calData', JSON.stringify(obj));
			state = {
				...state,
				data: obj
			}
			break;
		case 'DELETE_RECORD':
			obj = {...state.data};
			delete obj[action.payload];
			localStorage.setItem('calData', JSON.stringify(obj));
			state = {
				...state,
				data: obj
			}
			break;
		case 'SET_EDIT_FLAG': 
			state = {
				...state,
				edit: action.payload
			}
			break;
		case 'EDIT_RECORD': 
			obj = {...state.data};
			delete obj[action.oldKey];
			obj[action.key] = action.payload;
			localStorage.setItem('calData', JSON.stringify(obj));
			state = {
				...state,
				data: obj
			}
			break;
		default:
			break;
	}
	
	return state;
};

export default MyReducer;