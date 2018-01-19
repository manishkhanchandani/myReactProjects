import React, {Component} from 'react';
import {utubeIDGrabber} from '../utilities/functions.js';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import VideosCategory from './VideosCategory';
import searchYouTube from 'youtube-api-search';
import {Alert} from 'react-bootstrap';
import {processRecords} from '../utilities/functions.js';
import Paginator from '../utilities/Paginator.js';

class Videos extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			videoInput: '',
			videoInputId: '',
			videoTitle: '',
			videoDescription: '',
			videoStarring: '',
			videoDirector: '',
			videoMovieType: '',
			videoMaturityRatings: '',
			videoThumbnail: '',
			videoTags: '',
			category_id: '',
			subcategory_id: '',
			error: null,
			categories: null,
			videoList: null,
			pageNumber: 1
		};
	}
	
	componentDidMount() {
		var url = FirebaseConstant.basePath + '/list/' + this.props.match.params.list + '/videos';
		var ref = firebaseDatabase.ref(url);
		ref.on('value', (snapshot) => {
			let records = snapshot.val();
			if (!records) return;
			let myArray = [];
			for (let key in records) {
				let obj = records[key];
				obj._id = key;
				myArray.push(obj);
			}
			this.setState({videoList: myArray});
		});
			
	}
	
	chooseCategory(val) {
		this.setState({categories: val});
	}
	
	getVideoDetails(q) {		
		if (!q) return;
		searchYouTube({key: FirebaseConstant.configFb.apiKey, term: q, maxResults: 1}, (videos) => {
            if (!videos[0]) {
				return;	
			}
			
			let videoDetails = videos[0];
			let obj = {};
			
			obj.videoId = videoDetails.id.videoId;
			obj.description = videoDetails.snippet.description;
			obj.publishedAt = videoDetails.snippet.publishedAt;
			obj.imageUrl = videoDetails.snippet.thumbnails.high.url;
			obj.title = videoDetails.snippet.title;
			
			this.setState({videoTitle: obj.title, videoDescription: obj.description, videoThumbnail: obj.imageUrl});
		});
	}
	
	
	onActivePageChange(page) {
		this.setState({pageNumber: page});
	}

	submitFrm(e) {
		e.preventDefault();
		this.setState({error: null});
		if (!this.state.videoInput) {
			this.setState({error: 'Missing Video Id or Video URL'});
			return;
		}
		
		if (!this.state.videoTitle) {
			this.setState({error: 'Missing title'});
			return;
		}
		
		var obj = {};
		obj.videoInput = this.state.videoInput;
		obj.videoInputId = this.state.videoInputId;
		obj.videoTitle = this.state.videoTitle;
		obj.videoDescription = this.state.videoDescription;
		obj.videoStarring = this.state.videoStarring;
		obj.videoDirector = this.state.videoDirector;
		obj.videoMovieType = this.state.videoMovieType;
		obj.videoMaturityRatings = this.state.videoMaturityRatings;
		obj.videoThumbnail = this.state.videoThumbnail;
		let current = firebase.database.ServerValue.TIMESTAMP;
		obj.created_dt = current;
		var url = FirebaseConstant.basePath + '/list/' + this.props.match.params.list + '/videos';
		var unique_id = firebaseDatabase.ref(url).push(obj).key;
		
		if (!this.state.categories) return;
		
		let catUrl = FirebaseConstant.basePath + '/list/' + this.props.match.params.list + '/categories';
		
		for (let k in this.state.categories) {
			let tmp = k.split('|');
			let cat = tmp[0];
			let subcat = null;
			if (tmp.length === 2) {
				subcat = tmp[1];
				firebaseDatabase.ref(catUrl).child(cat).child('subcategories').child(subcat).child('videos').child(unique_id).set(current);
			} else {
				firebaseDatabase.ref(catUrl).child(cat).child('videos').child(unique_id).set(current);
			}
		}
		
		this.setState({error: 'Video Successfully added in the list.', videoInput: '', videoInputId: '', videoTitle: '', videoDescription: '', videoStarring: '', videoDirector: '', videoMovieType: '', videoMaturityRatings: '', videoThumbnail: '', videoTags: ''});
		window.scrollTo(0, 0);
	}

	changeVideoUrl(e) {
		if (!e.target.value) {
			return;	
		}
		let videoUrl = utubeIDGrabber(e.target.value);
		this.getVideoDetails(videoUrl);
		this.setState({videoInput: e.target.value, videoInputId: videoUrl});
	}

	render() {
		console.log('state var in video.js is ', this.state);
		
		let myArrayConverted = null;
		let paginationProps = null;
		if (this.state.videoList) {
			let obj = processRecords(this.state.videoList, '-created_dt', null, null, 5, this.state.pageNumber, this.onActivePageChange.bind(this));
			myArrayConverted = obj.myArrayConverted;
			paginationProps = obj.paginationProps;
		}
		
		console.log('myArrayConverted: ', myArrayConverted);
		console.log('paginationProps: ', paginationProps);
		
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<h3>Add Videos</h3>
						{
							this.state.error &&
							<Alert bsStyle="warning">
								{this.state.error}
							</Alert>
						}
						<form onSubmit={this.submitFrm.bind(this)}>
							<VideosCategory chooseCategory={this.chooseCategory.bind(this)} />
							<div className="form-group">
								<label>Youtube Video URL / ID</label>
								<input type="text" className="form-control" placeholder="Enter Video ID or URL" value={this.state.videoInput} onChange={this.changeVideoUrl.bind(this)} />
							</div>
							<div className="form-group">
								<label>Movie Thumbnail URL</label>
								<input type="text" className="form-control" placeholder="Enter Thumbnail" value={this.state.videoThumbnail} onChange={(e) => {
									this.setState({videoThumbnail: e.target.value});	
								}} />
							</div>
							<div className="form-group">
								<label>Title *</label>
								<input type="text" className="form-control" placeholder="Enter Title" value={this.state.videoTitle} onChange={(e) => {
									this.setState({videoTitle: e.target.value});	
								}} />
							</div>
							<div className="form-group">
								<label>Description</label>
								<textarea className="form-control" placeholder="Enter Description" value={this.state.videoDescription} onChange={(e) => {
									this.setState({videoDescription: e.target.value});	
								}} />
							</div>
							<div className="form-group">
								<label>Tags (Comma separated words for search purpose)</label>
								<input type="text" className="form-control" placeholder="Enter Tags" value={this.state.videoTags} onChange={(e) => {
									this.setState({videoTags: e.target.value});	
								}} />
							</div>
							<div className="form-group">
								<label>Year</label>
								<input type="text" className="form-control" placeholder="Enter Year" value={this.state.videoYear} onChange={(e) => {
									this.setState({videoYear: e.target.value});	
								}} />
							</div>
							<div className="form-group">
								<label>Starring</label>
								<input type="text" className="form-control" placeholder="Enter Starring" value={this.state.videoStarring} onChange={(e) => {
									this.setState({videoStarring: e.target.value});	
								}} />
							</div>
							<div className="form-group">
								<label>Director</label>
								<input type="text" className="form-control" placeholder="Enter Director" value={this.state.videoDirector} onChange={(e) => {
									this.setState({videoDirector: e.target.value});	
								}} />
							</div>
							<div className="form-group">
								<label>Movie Type like emotional or action</label>
								<input type="text" className="form-control" placeholder="Enter Movie Type" value={this.state.videoMovieType} onChange={(e) => {
									this.setState({videoMovieType: e.target.value});	
								}} />
							</div>
							<div className="form-group">
								<label>Maturity Ratings like TV-14 or TV-18</label>
								<input type="text" className="form-control" placeholder="Enter Maturity Ratings" value={this.state.videoMaturityRatings} onChange={(e) => {
									this.setState({videoMaturityRatings: e.target.value});	
								}} />
							</div>
							<br />
							<button type="submit" className="btn btn-primary form-control">Add Video</button>
						</form>
					</div>
					<div className="col-md-6">
						<h3>View Videos</h3>
						<br />
						{
							!myArrayConverted && 
							<div>
								No Record Found.
							</div>
						}
						{
							myArrayConverted &&
							<ul className="list-group">
								{
									myArrayConverted.map((value, index) => {
														  console.log(value);
										let url = '/'+this.props.match.params.list+'/detail/' + value._id;
										return	<li key={index} className="list-group-item">
										<div className="row">
											<div className="col-md-4"><img src={value.videoThumbnail} className="img-responsive img-thumbnail" alt="" /></div>
											<div className="col-md-8"><a href={url} target="_blank"><b>{value.videoTitle}</b></a></div>
										</div>
										</li>		 
									})
								}
							</ul>
						}
						<hr />
						<Paginator {...paginationProps} />
					</div>
				</div>
			</div>
		);
	}
}

export default Videos;