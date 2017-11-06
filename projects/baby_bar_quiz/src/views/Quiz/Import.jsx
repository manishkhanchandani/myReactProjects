import React, {Component} from 'react';
import axios from 'axios';

import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';

class Import extends Component {
	
	getData() {
		var url = 'http://localhost/project2017/qz/api/quiz_display.php?category_id=44,45,46,47&limit=1000&order=+id+ASC&allFields=1';
		axios.get(url)
		  .then(function (response) {
			var data = response.data;
			console.log('data is ', data);
			//var current = firebase.database.ServerValue.TIMESTAMP;
			var categoryUrl = FirebaseConstant.basePath + '/categories';
			var questionUrl = FirebaseConstant.basePath + '/questions';
			data.categories.map((record, index) => {
				firebaseDatabase.ref(categoryUrl).child('category_id_'+record.cat_id).set({cat_id: record.cat_id, category: record.category});
				return record;
			});
			data.data.map((record, index) => {
				firebaseDatabase.ref(questionUrl).child('category_id_'+record.category_id).child('question_'+record.id).set(record);
				return record;
			});
		
		  })
		  .catch(function (error) {
			console.log(error);
		  });	
	}
	
	componentDidMount() {
		//grab data from server
		this.getData();
		//export it to firebase
	}

	render() {
		return (
			<div>
				Import
			</div>
		);
	}
}

export default Import;