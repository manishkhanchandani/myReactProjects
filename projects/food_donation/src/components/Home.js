import React, {Component} from 'react';

import {connect} from 'react-redux';
import {browseFoodDonation} from '../actions/FoodDonationAction.js';

import ResultContainer from './ResultContainer.js';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import {Redirect} from 'react-router-dom';

import SearchForm from './SearchForm.js';

class Home extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			subObjects: {}	
		};
	}
	
	processLoop(key)
	{
		var subURL = FirebaseConstant.basePath + '/data/posts/'+key;
		var subRef = firebaseDatabase.ref(subURL);
		var tmp = this.state.subObjects;
		subRef.once('value', (subSnapshot) => {
			tmp[key] = subSnapshot.val();	
			this.setState({subObjects: tmp});
			
			this.props.func2(this.state.subObjects);
		});
	}

	componentDidMount() {
		var obj = this.props.match.params;
		console.log('obj is ', obj);
		var url = FirebaseConstant.basePath + '/data';
		if (obj.keyword && obj.lat && obj.lng) {
			//do something
		} else if (obj.lat && obj.lng) {
			//do something
			if (obj.boundary === 'county') {
				url = url + '/' + obj.boundary + '/' + obj.country + '/' + obj.state + '/' + obj.county;
			} else if (obj.boundary === 'city') {
				url = url + '/' + obj.boundary + '/' + obj.country + '/' + obj.state + '/' + obj.county + '/' + obj.city;
			} else if (obj.boundary === 'state') {
				url = url + '/' + obj.boundary + '/' + obj.country + '/' + obj.state;
			} else if (obj.boundary === 'country') {
				url = url + '/' + obj.boundary + '/' + obj.country;
			}
		} else if (obj.keyword) {
			//do something
		} else {
			//home page will go here	
			this.props.func1();
			return;
		}
		
		console.log('url is ', url);
		
		var ref = firebaseDatabase.ref(url);
		ref.on('value', (snapshot) => {
			var records = snapshot.val();
			if (!records) return null;
			
			for (var key in records) {
				this.processLoop(key);
			}
		});
	}

	render() {
		console.log('state is ', this.state);
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<SearchForm {...this.props} />
					</div>
					<div className="col-md-9">
						<h3>Results</h3>
						
						<ResultContainer data={this.props.foodReducer.data} />
						
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		foodReducer: state.FoodDonationReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		func1: () => {
			//api or firebase or any url which backend developer has provide to you		
			var url = FirebaseConstant.basePath + '/data/posts';
			//create a reference of above url
			var ref = firebaseDatabase.ref(url);
			ref.on('value', function(snapshot) {
				dispatch(browseFoodDonation(snapshot.val()));	
			});
			
		},
		
		func2: (details) => {
			dispatch(browseFoodDonation(details));	
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);