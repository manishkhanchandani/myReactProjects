
import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';


export const browseFoodDonation = (params) => {
	return {
		type: 'BROWSE',
		payload: new Promise((resolve, reject) => {
			//api or firebase or any url which backend developer has provide to you		
			var url = FirebaseConstant.basePath + '/data/posts';
			//create a reference of above url
			var ref = firebaseDatabase.ref(url);
			ref.on('value', function(snapshot) {
				console.log('snapshot is ', snapshot.val());
				resolve(snapshot.val());
			});
		})
	};
};