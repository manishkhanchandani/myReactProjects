import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';

import TortsImportAssault from './torts/ImportAssault.js';

class Import1 extends Component {
	
	importSubjects(e) {
		e.preventDefault();
		var subjects = {
			contracts: {
				key: 'contracts',
				name: 'Contracts'
			},
			criminal: {
				key: 'criminal',
				name: 'Criminal'
			},
			torts: {
				key: 'torts',
				name: 'Torts'
			}
		};
		var url = FirebaseConstant.basePath + '/quiz/subjects';
		firebaseDatabase.ref(url).set(subjects);
	}
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
	
	
	importContracts(e) {
		e.preventDefault();
		let url = 'http://localhost/project2017/qz/api/quiz_display.php?category_id=44&limit=1000&order=+id+ASC&allFields=1';	
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
				console.log('url2 is ', url2);
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
			console.log('categories: ', categories);
			url = FirebaseConstant.basePath + '/quiz/categories';
			console.log('url: ', url);
			firebaseDatabase.ref(url).update(categories);
		}).catch((err) => {
			console.log('error is ', err);	
		});
	}
	
	
	
	
	importCriminal(e) {
		e.preventDefault();
		let url = 'http://localhost/project2017/qz/api/quiz_display.php?category_id=45&limit=1000&order=+id+ASC&allFields=1';	
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
				console.log('url2 is ', url2);
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
			console.log('categories: ', categories);
			url = FirebaseConstant.basePath + '/quiz/categories';
			console.log('url: ', url);
			firebaseDatabase.ref(url).update(categories);
		}).catch((err) => {
			console.log('error is ', err);	
		});
	}
	
	
	importTorts(e) {
		e.preventDefault();
		let url = 'http://localhost/project2017/qz/api/quiz_display.php?category_id=46&limit=1000&order=+id+ASC&allFields=1';	
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
				console.log('url2 is ', url2);
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
			console.log('categories: ', categories);
			url = FirebaseConstant.basePath + '/quiz/categories';
			console.log('url: ', url);
			firebaseDatabase.ref(url).update(categories);
		}).catch((err) => {
			console.log('error is ', err);	
		});
	}
	
	
	
	
	importQuiz(cat_id, e) {
		e.preventDefault();
		let url = 'http://localhost/project2017/qz/api/quiz_display.php?category_id='+cat_id+'&limit=1000&order=+id+ASC&allFields=1';	
		console.log('url is ', url);
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
				console.log('url2 is ', url2);
				firebaseDatabase.ref(url2).set(myObject[i]);	
			}
			
			var categories = {};
			j.categories.map((value, key) => {
				let id = 'category_' + value.cat_id;
				categories[id] = {
					key: id,
					name: value.displayCategory,
					cnt: countCategories[id]
				};  
				return true;
			});
			console.log('categories: ', categories);
			url = FirebaseConstant.basePath + '/quiz/categories';
			console.log('url: ', url);
			firebaseDatabase.ref(url).update(categories);
		}).catch((err) => {
			console.log('error is ', err);	
		});
	}
	
	
	render() {
		return (
			<div className="container">
			<h1>Imports</h1>
				<div><a href="" onClick={this.import1.bind(this)}>Import 1980 FYLSE</a></div>
				<div><a href="" onClick={this.importContracts.bind(this)}>Contracts</a></div>
				<div><a href="" onClick={this.importCriminal.bind(this)}>Criminal</a></div>
				<div><a href="" onClick={this.importTorts.bind(this)}>Torts</a></div>
				<div><a href="" onClick={this.importQuiz.bind(this, 27)}>Siegel Contract</a></div>
				<div><a href="" onClick={this.importQuiz.bind(this, 28)}>Siegel Criminal</a></div>
				<div><a href="" onClick={this.importQuiz.bind(this, 29)}>Siegel Torts</a></div>
				<hr />
				<div><a href="" onClick={this.importQuiz.bind(this, 22)}>A Contract</a></div>
				<div><a href="" onClick={this.importQuiz.bind(this, 19)}>A Criminal</a></div>
				<div><a href="" onClick={this.importQuiz.bind(this, 21)}>A Torts</a></div>
				<hr />
				
				<div><a href="" onClick={this.importQuiz.bind(this, 33)}>TEST #1 CONTRACTS - TERMS AND FORMATION</a></div>
				<div><a href="" onClick={this.importQuiz.bind(this, 34)}>TEST #2 CONTRACTS - INTERPRETATION AND ENFORCEABILITY</a></div>
				<div><a href="" onClick={this.importQuiz.bind(this, 35)}>TEST #3 CONTRACTS - THIRD PARTIES AND REMEDIES</a></div>
				<div><a href="" onClick={this.importQuiz.bind(this, 36)}>TEST #4 UCC</a></div>
				<div><a href="" onClick={this.importQuiz.bind(this, 37)}>TEST #5 - TORTS - INTENTIONAL TORTS AND DEFENSES</a></div>
				<div><a href="" onClick={this.importQuiz.bind(this, 38)}>TEST # 6 - TORTS - NEGLIGENCE AND DEFENSES</a></div>
				<div><a href="" onClick={this.importQuiz.bind(this, 39)}>TEST # 7 - TORTS - DEFAMATION / PRODUCT LIABILITY / MISCELLANEOUS</a></div>
				<div><a href="" onClick={this.importQuiz.bind(this, 40)}>TEST # 8 - CRIMINAL LAW FUNDAMENTALS AND CRIMES AGAINST PROPERTY</a></div>
				<div><a href="" onClick={this.importQuiz.bind(this, 42)}>TEST # 9 - CRIMES AGAINST THE PERSON / VICARIOUS LIABILITY / DEFENSES</a></div>
				
				
				<hr />
				
				<div><a href="" onClick={this.importSubjects.bind(this)}>Import Subjects</a></div>	
				<hr />
					
				<TortsImportAssault />		
			</div>
		);
	}
}

export default Import1;


					/*
					https://www.youtube.com/watch?v=prorUcdD98c&list=PLpbtRdN7xWUfKfRXfbgaPdQZBQSS1n2Vr
					
					criminal{
						year: 'june 2002',
						hypo: `Debbie and Jon met in college and dated each other for two years. Debbie loved Jon very much and wanted to marry him. Jon always told her that he loved only her, but he told her he thought they were too young and should not rush into marriage.<br /><br />
One day as Debbie was putting gasoline into her car at the gasoline station, she looked into the car parked next to hers. She was enraged to see her best friend Vickie passionately kissing Jon. Debbie walked over to the car, with the fuel dispenser in her hand, and started yelling at Vickie and Jon. Vickie said, "I'm sorry you had to find out this way. Jon and I love each other and are going to get married."<br /><br />
Debbie was enraged and shouted, "You're not going to marry anyone, you slime!" She then pointed the gasoline dispenser at Vickie and sprayed her with gasoline, soaking her hair and clothes. Jon reached over to try to help Vickie. Unfortunately, he was smoking a cigarette. The cigarette ignited the gasoline and Vickie burned to death.<br /><br />
What offense or offenses has Debbie committed and what defenses, if any, would she assert? Discuss.`,
						solution: [
							`In this case, the state may argue that when Debbie pointed the gasoline dispenser at Vickie, while shouting at her, Vickie could have reasonably apprehended an unlawful and offensive contact, i.e., being sprayed with gasoline.
Debbie has committed an assault.`		   
						]
					}*/	