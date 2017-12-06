
import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

export const createNewPost = (obj) => {
	return {
		type: 'CREATE_NEW_POST',
		payload: new Promise((resolve, reject) => {
			//firebase thing
			console.log('firebase is coming soon');
			var url = FirebaseConstant.basePath + '/data/posts';
			firebaseDatabase.ref(url).push(obj);
		})
	};
};


export const viewData = (obj) => {
	return {
		type: 'VIEW_POST',
		payload: obj
	};
};

export const saveSearchInfo = (obj) => {
	return {
		type: 'SAVE_SEARCH_INFO',
		payload: obj
	};
};

