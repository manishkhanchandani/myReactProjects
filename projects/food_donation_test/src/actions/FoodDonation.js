
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

export const createPost = (params) => {
	return {
		type: 'CREATE_POST',
       payload: new Promise((resolve, reject) => {
           var url = FirebaseConstant.basePath + '/posts';
           firebaseDatabase.ref(url).push(params);
           resolve(params);
       })
	};	
};
