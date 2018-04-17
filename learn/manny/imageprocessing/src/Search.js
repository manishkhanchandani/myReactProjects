import React, {Component} from 'react';
import {connect} from 'react-redux';
import DoUploadSearch from './DoUploadSearch.js';
import {firebaseDatabase, FirebaseConstant} from './MyFirebase.js';
import {imageMatch, getUrlByFileNameSelfHigh} from './AWS.js';


class Search extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			searchStatus: 'pending'
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.myReducer.search === 'started' && nextProps.myReducer.search !== this.state.searchStatus && nextProps.myReducer.uploadedFiles && nextProps.myReducer.uploadedFiles[0] && nextProps.myReducer.imageMatch) {
			this.setState({searchStatus: nextProps.myReducer.search});
			let emptyObj = {};
			emptyObj[nextProps.myReducer.uploadedFiles[0].name] = true;
			let arr = nextProps.myReducer.imageMatch;
			for (let i = 0; i < arr.length; i++) {
				if (!arr[i]) continue;
				if (!emptyObj[arr[i]]) {
					this.props.callGetUrlByFileNameSelfHigh(arr[i]);
					emptyObj[arr[i]] = true;
				}
			}
		}
	}
	componentWillMount() {
		var url = FirebaseConstant.basePath;
		firebaseDatabase.ref(url).child('search').set('pending');
	}
	
	changeStatus(status) {
		var url = FirebaseConstant.basePath;
		firebaseDatabase.ref(url).child('search').set(status);
	}

	render() {
		let img = null;
		if (this.props.myReducer.uploadedFiles && this.props.myReducer.uploadedFiles[0]) {
			if (this.props.myReducer.images[this.props.myReducer.uploadedFiles[0].name]) {
				img = this.props.myReducer.images[this.props.myReducer.uploadedFiles[0].name];
			}
		}
		
		let show = null;
		if (this.props.myReducer.imageMatch) {
			show = this.props.myReducer.imageMatch;
		}

		return (
			<div className="my-container container search fade-in">
				<div className="row heading text-center">
					<div className="col-md-12">
						Search Images
					</div> 
				</div>
					
				<div className="row">
					<div className="col-md-12">
						<DoUploadSearch isMultiple={false} />
					</div> 
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="thumbnail1 bg-image">
							{
								!img ? 
								<div>
									<img src="/img/img_analyze_bg.png" className="img-responsive" alt="loading1" />
									<div className="txt">No Image Uploaded<br /> Try, "Alexa, upload and process image..."</div>
								</div>
								:
								<div>
									<img src={img} className="img-responsive" alt="loading1" />
								</div>
							}
						</div>
					</div>
					<div className="col-md-6">
						{/*<a href="" onClick={(e) => {e.preventDefault(); this.changeStatus('started');}}>Start</a>*/}
						<div className="row bottom-row">
							<div className="col-md-12 bottom-column">
								{
									show &&
									show.map((value, key) => {
										return <div className="bottom-column-item thumbnail" key={key}>
											{
												(this.props.myReducer.search === 'started' && this.props.myReducer.images[value]) &&
												<img src={this.props.myReducer.images[value]} alt={value} />
											}
											
											{
												(this.props.myReducer.search === 'started' && !this.props.myReducer.images[value]) &&
												<img src="/img/loading7.gif" className="img-responsive" alt="loading1" />
											}
											
											{
												(this.props.myReducer.search !== 'started') &&
												<span></span>
											}
										</div>					 
									})
								}
							</div>
						
						</div>
					</div> 
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myReducer: state.MyReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callImageMatch: (file) => {
			dispatch(imageMatch(dispatch, file));
		},
		callGetUrlByFileNameSelfHigh: (file) => {
			dispatch(getUrlByFileNameSelfHigh(file));	
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);