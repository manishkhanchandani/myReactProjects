import {getUID} from '../auth/AuthAction.js';

const EssaysReducer = (state = {
	data: null,
	new_essay: null,
	list_essay: null,
	list_essay_obj: {},
	selected_essay: null,
	new_issue: null
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
		case 'POST_NEW_ISSUE_FULFILLED':
			state = {
				...state,
				new_issue: action.payload
			}
			break;
		case 'LIST_ESSAYS_OBJ':
			let list_essays_obj = {...state.list_essay_obj};
			let id = action.payload.id;
			let uid = getUID();
			if (action.payload.type === 'private' && uid !== action.payload.user.uid) {
				if (!action.payload.uids) {
					return state;	
				}
				if (!action.payload.uids[uid]) {
					return state;
				}
			}
			
			list_essays_obj[id] = action.payload;
			state = {
				...state,
				list_essay_obj: list_essays_obj
			}
			let myVar = [];
			for (let key in state.list_essay_obj) {
				if (state.list_essay_obj[key].status !== 1) {
					continue;	
				}
				myVar.push(state.list_essay_obj[key]);
			}
			state = {
				...state,
				list_essay: myVar
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