import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';


let default_list_path = '';
if (process.env.NODE_ENV === 'development') {
	default_list_path = '-L2OQwPD_BFG4iayeVax';
} else {
	default_list_path = '-L6KrRaYobta86tBsfXL';
}


export const defaultList = default_list_path;

export const changeList = (newList) => {
	return {
		type: 'CHANGE_LIST',
		payload: newList
	};
};

export const getListData = (list_id) => {
	return {
		type: 'MYFLIX_GET_LIST_DATA',
		payload: new Promise((resolve, reject) => {
			var url = FirebaseConstant.basePath + '/list/' + list_id;
			var ref = firebaseDatabase.ref(url);
			ref.once('value', (snapshot) => {
				var records = snapshot.val();
				resolve(records);
			});
		})
	};	
	
};


export const updateCategories = (categories, showCategories) => {
	return {
		type: 'MYFLIX_CATEGORIES',
		categories: categories,
		showCategories: showCategories
	};	
	
};

export const updateCatValue = (value) => {
	return {
		type: 'MYFLIX_CATEGORY_VALUE',
		payload: value
	};	
	
};