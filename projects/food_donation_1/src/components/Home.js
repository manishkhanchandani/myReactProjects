import React, {Component} from 'react';
import {connect} from 'react-redux';
import Autocomplete from 'react-google-autocomplete';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

import {viewData} from '../actions/FoodAction.js';

class Home extends Component {
	
	getDataFromFB() {
		var url = FirebaseConstant.basePath + '/data/posts';
		var ref = firebaseDatabase.ref(url).limitToLast(500);
		ref.on('value', (snapshot) => {
			console.log('snapshot is ', snapshot.val());
			//getting results from the firebase
			var records = snapshot.val();
			//converting object to array
			var myArray = [];
			for (let key in records) {
				var record = records[key];
				record.id = key;
				myArray.push(record);
			}
			
			console.log('myArray: ', myArray);
			this.props.callViewData(myArray);
		});
	}
	
	componentDidMount() {
		this.getDataFromFB();	
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<h3>Search Food Donation</h3>
						<form>
						  <div className="form-group">
							<label>Keyword</label>
							<input type="text" className="form-control" id="keyword" placeholder="Enter Keyword" />
						  </div>
						  <div className="form-group">
							<label>Location (*)</label>
							<Autocomplete className="form-control" onPlaceSelected={(place) => {
								console.log(place);  
							}}
							types={['geocode']}
							/>
						  </div>
						  <button type="submit" className="btn btn-primary form-control">Search</button>
						</form>
					</div>
					<div className="col-md-9">
						<h3>Search Results</h3>
							<div className="row">
						{
							this.props.food_reducer.data && 
								this.props.food_reducer.data.map((value, key) => {
									return <div className="col-md-6" key={key}>
											<div className="media">
											  <div className="media-left">
												<a href="">
												  <img className="media-object myAccountImg" src={value.imageUrl} alt="..." />
												</a>
											  </div>
											  <div className="media-body">
												<h4 className="media-heading">{value.title}</h4>
												<div>{value.description}</div>
												<div><a href="">Send Message</a> | <a href="">Send Email</a> | <a href="">Call</a></div>
											  </div>
											</div>
									
										</div>
								})	
						}
						</div>
						
						
						
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		food_reducer: state.FoodReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callViewData: (obj) => {
			dispatch(viewData(obj));
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);