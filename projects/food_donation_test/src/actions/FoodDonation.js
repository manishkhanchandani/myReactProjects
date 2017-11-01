import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';


export const createPost = (params) => {
	return {
		type: 'CREATE_POST',
       payload: new Promise((resolve, reject) => {
            params.created_dt= firebase.database.ServerValue.TIMESTAMP;
            var url = FirebaseConstant.basePath + '/data/posts';
            var postId = firebaseDatabase.ref(url).push(params).key;
            firebaseDatabase.ref(url).child(postId).child('postId').set(postId);
            var current = firebase.database.ServerValue.TIMESTAMP;
            var state = params.location.administrative_area_level_1;
            var country = params.location.country;
            var county =params.location.administrative_area_level_2;
            var city = params.location.locality;
            
            var urlCountry = FirebaseConstant.basePath + '/data/country';
            firebaseDatabase.ref(urlCountry).child(country).child(postId).set(current);
            
            var urlState = FirebaseConstant.basePath + '/data/state';
            firebaseDatabase.ref(urlState).child(country).child(state).child(postId).set(current);

            var urlCounty = FirebaseConstant.basePath + '/data/county';
            firebaseDatabase.ref(urlCounty).child(country).child(state).child(county).child(postId).set(current);
            
            var urlCity = FirebaseConstant.basePath + '/data/city';
            firebaseDatabase.ref(urlCity).child(country).child(state).child(county).child(city).child(postId).set(current);
            
            var urlUser = FirebaseConstant.basePath + '/data/users';
            firebaseDatabase.ref(urlUser).child(params.user_id).child(postId).set(current);
            
            
            var tags = params.tags.split(',');
            
            if (tags.length > 0) {
                for (var i = 0; i < tags.length; i++) {
                    var tag = tags[i].trim();
                    console.log('tag is ', tag);
                    
                    urlCountry = FirebaseConstant.basePath + '/data/tags/'+tag+'/country';
                    firebaseDatabase.ref(urlCountry).child(country).child(postId).set(current);
                    
                    urlState = FirebaseConstant.basePath + '/data/tags/'+tag+'/state';
                    firebaseDatabase.ref(urlState).child(country).child(state).child(postId).set(current);
        
                    urlCounty = FirebaseConstant.basePath + '/data/tags/'+tag+'/county';
                    firebaseDatabase.ref(urlCounty).child(country).child(state).child(county).child(postId).set(current);
                    
                    urlCity = FirebaseConstant.basePath + '/data/tags/'+tag+'/city';
                    firebaseDatabase.ref(urlCity).child(country).child(state).child(county).child(city).child(postId).set(current);
                }
            }
            
            var obj = {};
            obj.postId = postId;
            resolve(obj);
       })
	};	
};

export const browsePost = (result) => {
    return {
        type: 'BROWSE',
        payload: result
    }
}
