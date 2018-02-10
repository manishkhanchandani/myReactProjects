import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

export const defaultList = '-L2OQwPD_BFG4iayeVax';

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