import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';

class Import1 extends Component {
	import1(e) {
		e.preventDefault();
		let url = 'http://localhost/project2017/qz/api/quiz_display.php?category_id=47&limit=1000&order=+id+ASC&allFields=1';	
		fetch(url, {
			method: 'GET'	  
		}).then((response) => {
			return response.json();
		}).then((j) => {
			console.log('j is ', j);
			var url = '';
			var countCategories = {};
			
			var myObject = {};
			j.data.map((value, key) => {
				let id = 'category_' + value.category_id;
				if (!myObject[id]) {
					myObject[id] = [];	
				}
				myObject[id].push(value);
				return true;
			});
			console.log(myObject);
			
			for (let i in myObject) {
				countCategories[i] = myObject[i].length;
				var url2 = FirebaseConstant.basePath + '/quiz/questions/' + i;
				firebaseDatabase.ref(url2).set(myObject[i]);	
			}
			
			var categories = {};
			j.categories.map((value, key) => {
				let id = 'category_' + value.cat_id;
				categories[id] = {
					key: id,
					name: value.category,
					cnt: countCategories[id]
				};  
				return true;
			});
			
			url = FirebaseConstant.basePath + '/quiz/categories';
			firebaseDatabase.ref(url).update(categories);
		}).catch((err) => {
			console.log('error is ', err);	
		});
	}
	render() {
		return (
			<div className="container">
			<h1>Imports</h1>
				<a href="" onClick={this.import1.bind(this)}>Import 1980 FYLSE</a>			
			</div>
		);
	}
}

export default Import1;