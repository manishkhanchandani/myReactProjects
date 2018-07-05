
import {firebaseApp, firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

export const loggedIn = (params) => {
	localStorage.setItem('mk-fb-user', JSON.stringify(params));
	return {
		type: 'LOGGEDIN',
		email: params.email,
		displayName: params.displayName,
		photoURL: params.photoURL,
		uid: params.uid,
		profile_uid: params.uid,
		providerId: params.providerId,
		access_level: params.access_level
	};
};

export const removeOnline = () => {
	/*console.log('user removed from online system');
	let uid = getUID();
	console.log('user with id ', uid);
	if (uid) {
		let url = FirebaseConstant.basePath + '/online_users/' + uid;
		console.log('user with url ', url);
		firebaseDatabase.ref(url).set(null);
	}*/
}

export const loggedOut = () => {
	localStorage.removeItem('mk-fb-user');
	return {
		type: 'LOGGEDOUT'	
	};	
};

export const getUID = () => {
	let userObj = localStorage.getItem('mk-fb-user');
	if (!userObj) return null;
	let obj = JSON.parse(userObj);
	let uid = obj.uid;
	return uid;
};


export const getUsersObj = () => {
	let obj = localStorage.getItem('mk-fb-user');
	if (!obj) {
		return null;	
	}
	let usersObj = JSON.parse(obj);
	return usersObj;
};


export const onlinePresence = (data) => {
	return {
		type: 'ONLINE_PRESENCE',
		payload: data
	};	
};


export const FirebaseAuthSystem = (dispatch) => {
	firebaseApp.auth().onAuthStateChanged((user) => {
		if (user) {
			var url = FirebaseConstant.basePath + '/users/' + user.uid;
			firebaseDatabase.ref(url).once('value').then((snapshot) => {
				let result = snapshot.val();
				if (!result) {
					dispatch(loggedOut());
					return;
				}

				if (result.ban === 1) {
					alert('Account is unauthorized, contact admin at admin@calbabybar.com');
					dispatch(loggedOut());
					return;
				}

				var obj = {};
				obj.email = result.email;
				obj.displayName = result.displayName;
				obj.photoURL = result.photoURL;
				obj.uid = user.uid;
				obj.profile_uid = result.profile_uid;
				obj.providerId = result.providerId;
				obj.access_level = result.access_level;
				dispatch(loggedIn(obj));
			});
			
			/*console.log('user added in online system');
			let uobj = {
				uid: obj.uid,
				name: obj.displayName,
				img: obj.photoURL,
				in_time: firebase.database.ServerValue.TIMESTAMP
			};
			let url = FirebaseConstant.basePath + '/online_users/' + obj.uid;
			firebaseDatabase.ref(url).set(uobj);*/
		} else {
			dispatch(loggedOut());
		}
	});
	
	/*
	let urlX = FirebaseConstant.basePath + '/online_users';
	firebaseDatabase.ref(urlX).on('value', (snapshot) => {
		let result = snapshot.val();
		console.log('online users is ', result);
		var myArray = [];
		for (var key in result) {
			var obj = result[key];
			obj.dt = timeAgo(obj.in_time);
			myArray.push(obj);
		}
		
		//sorting
		myArray.sort(dynamicSort('-in_time'));
		
		dispatch(onlinePresence(myArray));
	});*/
};
