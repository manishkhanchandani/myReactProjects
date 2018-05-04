import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseDatabase, FirebaseConstant} from './MyFirebase.js';
import {imageMatch, getUrlByFileNameSelfHigh} from './AWS.js';


class Search extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			searchStatus: 'pending',
			loader: 0
		}
	}
	
	getPictureUrl(props) {
		//console.log('loader: ', this.state.loader);
		//console.log('len: ', this.props.myReducer.imageMatch.length);
		if (!props.myReducer.imageMatch) {
			return;
		}
		
		if (props.myReducer.imageMatch.length === this.state.loader) {
			//console.log('done');
			var url = FirebaseConstant.basePath;
			firebaseDatabase.ref(url).child('search').set('completed');
			return;	
		}
		let data = props.myReducer.imageMatch[this.state.loader];
		//console.log('data is ', data);
		if (data) {
			if (props.myReducer.images_highres[data]) {
				this.setState({loader: this.state.loader + 1}, () => {
					this.getPictureUrl(props);			  
				});
			} else {
				props.callGetUrlByFileNameSelfHigh(data, () => {
					this.setState({loader: this.state.loader + 1}, () => {
						this.getPictureUrl(props);			  
					});								   
				});
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.myReducer.search === 'started' && nextProps.myReducer.search !== this.state.searchStatus && nextProps.myReducer.imageMatch) {
			this.setState({searchStatus: nextProps.myReducer.search, loader: 0}, () => {
				this.getPictureUrl(nextProps);												  
			});
			
		} else if (nextProps.myReducer.search !== this.state.searchStatus) {
			this.setState({searchStatus: nextProps.myReducer.search, loader: 0});
		}
	}

	componentWillMount() {
		//var url = FirebaseConstant.basePath;
		//firebaseDatabase.ref(url).child('search').set('pending');
	}
	componentDidMount() {
	}
	
	changeStatus(status) {
		var url = FirebaseConstant.basePath;
		firebaseDatabase.ref(url).child('search').set(status);
	}

	render() {
		const mapPending = [0,1,2,3,4,5,6,7];
		let img = null;
		if (this.props.myReducer.image_name && this.props.myReducer.images && (this.props.myReducer.images_highres[this.props.myReducer.image_name] || this.props.myReducer.images[this.props.myReducer.image_name])) {
			img = this.props.myReducer.images_highres[this.props.myReducer.image_name] || this.props.myReducer.images[this.props.myReducer.image_name];
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
				<div className="row second-row text-center">
					{
						(this.props.myReducer.image_name && this.props.myReducer.search === 'started') && 
						<span className="sub-details"><img src="/img/greenloaderBar2.gif" alt="loading1" /></span>	
					}
				</div>
					
				<div className="row main-content">
					<div className="col-md-6">
						<div className="thumbnail1 bg-image">
							{
								!img ? 
								<div>
									<img src="/img/shutterstock_712489231.jpg" className="img-responsive" alt="loading1" />
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
										let altval = `${key} - ${value}`;
										if (this.props.myReducer.images_highres[value] === '/img/noImage.gif') {
											console.log('not found: ', key, ' val: ', value);
											return null;	
										}
										return <div className="bottom-column-item" key={key}>
											{
												(this.props.myReducer.search === 'started' && this.state.loader === key && !this.props.myReducer.images_highres[value]) && 
												<img src="/img/circular_loader.gif" className="imgLoader" alt={altval} />
											}
											{
												(this.props.myReducer.search === 'started' && this.state.loader > key && this.props.myReducer.images_highres[value]) && 
												<img src={this.props.myReducer.images_highres[value]} alt={altval} className="img" />
											}
											{
												(this.props.myReducer.search === 'completed' && this.props.myReducer.images_highres[value]) && 
												<img src={this.props.myReducer.images_highres[value]} alt={altval} className="img" />
											}
										</div>					 
									})
								}
								{
									(!show) &&
									mapPending.map((value, key) => {
										return <a className="bottom-column-item" key={key} >
											
										</a>			 
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
		callGetUrlByFileNameSelfHigh: (file, callback=null) => {
			dispatch(getUrlByFileNameSelfHigh(file, callback));	
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);