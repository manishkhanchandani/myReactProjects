import React, {Component} from 'react';
import {connect} from 'react-redux';
import Autocomplete from 'react-google-autocomplete';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';

import {viewData, saveSearchInfo} from '../actions/FoodAction.js';

import {distance} from '../utilities/functions.js';

class Home extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			keyword: '',
			location: null,
			boundary: 'county',
			tmp_keyword: null,
			tmp_location: {
				formatted_address: ''	
			}
		};
	}
	
	getDataFromFB(obj=null) {
		console.log('props are: ', this.props);
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
				if (props && props.food_reducer.form_fields && props.food_reducer.form_fields.location && props.food_reducer.form_fields.location.lat && props.food_reducer.form_fields.location.lng) {
					record.distance = distance(props.food_reducer.form_fields.location.lat, props.food_reducer.form_fields.location.lng, record.location.lat, record.location.lng);
				}
				myArray.push(record);
			}
			
			console.log('myArray: ', myArray);
			this.props.callViewData(myArray);
		});
	}
	
	componentDidMount() {
		this.getDataFromFB();	
	}
	
	componentWillReceiveProps(nextProps) {		
		if (nextProps.food_reducer.form_fields) {
			let check1 = (nextProps.food_reducer.form_fields.keyword && this.state.tmp_keyword != nextProps.food_reducer.form_fields.keyword);
			let check2 = (nextProps.food_reducer.form_fields.location && this.state.tmp_location != nextProps.food_reducer.form_fields.location.formatted_address);
			console.log('check1: ', check1, ', check2: ', check2);
			if (check1 || check2) {
			console.log('check1: ', check1, ', check2: ', check2);
				this.getDataFromFB(nextProps);
			}
			this.setState({tmp_location: nextProps.food_reducer.form_fields.location.formatted_address, tmp_keyword: nextProps.food_reducer.form_fields.keyword});
			
		}
	}
	
	frmSub(e) {
		e.preventDefault();
		var obj = {
			keyword: this.state.keyword,
			location: this.state.location,
			boundary: this.state.boundary
		}
		this.props.callSaveSearchInfo(obj);
	}

	render() {
		console.log('state is ', this.state);
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<h3>Search Food Donation</h3>
						<form onSubmit={this.frmSub.bind(this)}>
						  <div className="form-group">
							<label>Keyword</label>
							<input type="text" className="form-control" id="keyword" placeholder="Enter Keyword" value={this.state.keyword} onChange={(e) => {this.setState({keyword: e.target.value})}} />
						  </div>
						  <div className="form-group">
							<label>Your Home/Work Location (*)</label>
							<Autocomplete className="form-control addressBox" onPlaceSelected={(place) => {
								console.log(place); 
								if (!place.formatted_address) {
									alert('please choose the address from drop down');
									return null;
								}
								
								var obj = {};
								obj.formatted_address = place.formatted_address;
								obj.lat = place.geometry.location.lat();
								obj.lng = place.geometry.location.lng();
								
								var componentForm = {
									locality: 'long_name',
									administrative_area_level_1: 'short_name',
									country: 'short_name',
									administrative_area_level_2: 'long_name'
								  };

								var addressType = null;
								for (var i = 0; i < place.address_components.length; i++) {
									addressType = place.address_components[i].types[0];
									if (componentForm[addressType]) {
										obj[addressType] = place.address_components[i][componentForm[addressType]];
									}
								}
								
								this.setState({location: obj});
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
												<div><a href="">Send Message</a></div>
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
		},
		callSaveSearchInfo: (obj) => {
			dispatch(saveSearchInfo(obj));
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);