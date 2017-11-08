import React, {Component} from 'react';

class App extends Component {
	
	query1() {
		var result = new Promise((resolve, reject) => {
			var url = 'https://jsonplaceholder.typicode.com/posts';
			fetch(url, {
			method: 'GET'	  
			}).then((response) => {
				return response.json();
			}).then((j) => {
				console.log('j is ', j);//very important
				resolve(j);
			}).catch((err) => {
				console.log('error is ', err);	
				reject(err);
			});
		});
		
		console.log('result: ', result);
	}
	
	query2() {
		
	}
	
	componentDidMount() {
		this.query1();
	}

	render() {
		return (
			<div>
				
			</div>
		);
	}
}

export default App;