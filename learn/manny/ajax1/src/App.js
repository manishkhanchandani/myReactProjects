import React, { Component } from 'react';


class App extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			data1: null,
			error: null
		}
	}
	
	func1(e) {
		e.preventDefault();
		var url = 'http://api.mkgalaxy.com/api.php?action=continuityLatLng&noOfDays=11&from[dob]=1974-06-05+12:30:00&from[lat]=19.2215115&from[lng]=73.16446280000002&to[dob]=2017-12-02%2010%3A23%3A02&to[lat]=37.35410789999999&to[lng]=-121.95523559999998&access_token=YWRtaW46cGFzc3dvcmQ';
		
		let headers = new Headers();
		headers.append('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ');
		
		fetch(url, {
			method: 'GET',
        	headers: headers,	  
		})
		.then((response) => {
			return response.json();	   
		})
		.then((record) => {
			console.log('record is ', record);	;
			this.setState({data1: record});   
		})
		.catch((err) => {
			console.log(err);
		});
	}
	
	componentDidMount() {
		
	}

  render() {
	  console.log('state is ', this.state);

    return (
      <div>
	  <a href="" onClick={this.func1.bind(this)}>Find Naks</a><br /><br />
       Naks: {
		   	this.state.data1 &&
		   this.state.data1.data.map((value, key) => {
				return <div key={key}>{value.naks} / {value.date} / {value.names}</div>						  
			})
	   }
	   <br /><br />
	   Error: {this.state.error}
      </div>
    );
  }
}

export default App;
