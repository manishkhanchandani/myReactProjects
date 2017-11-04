import React, {Component} from 'react';

import {connect} from 'react-redux';
import {browseFoodDonation} from '../actions/FoodDonationAction.js';

import ResultContainer from './ResultContainer.js';
import {firebaseDatabase, FirebaseConstant} from '../MyFireBase.js';
import {Redirect} from 'react-router-dom';

import SearchForm from './SearchForm.js';

class Home extends Component {
	
	componentDidMount() {
		this.props.func1();
	}

	render() {
		console.log('props are ', this.props);
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<SearchForm />
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
			
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);