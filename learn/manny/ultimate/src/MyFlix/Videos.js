import React, {Component} from 'react';
import {utubeIDGrabber} from '../utilities/functions.js';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import VideosCategory from './VideosCategory';
import searchYouTube from 'youtube-api-search';



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
			videoThumbnail: '',
			videoYear: '',
			videoMaturityRatings: '',
			isFeatured: false,
			error: null,
			categories: null,
			videoDetails: null
		};
	}
	
	componentDidMount() {
		
	}
	
	getVideoDetails(term) {
		if (!term) return;
		console.log('term is ', term, ', key is ', FirebaseConstant.configFb.apiKey);
		searchYouTube({key: FirebaseConstant.configFb.apiKey, term: term, maxResults: 1}, (videos) => {
            console.log('videos: ', videos);
			if (!videos[0]) {
				this.setState({videoDetails: null});
				return;
			}
			let videoDetails = videos[0];
			console.log('videoDetails: ', videoDetails);
			let obj = {};
			obj.videoId = videoDetails.id.videoId;
			obj.description = videoDetails.snippet.description;
			obj.publishedAt = videoDetails.snippet.publishedAt;
			obj.imageUrl = videoDetails.snippet.thumbnails.high.url;
			obj.title = videoDetails.snippet.title;
			this.setState({videoDetails: obj, videoTitle: obj.title, videoDescription: obj.description, videoThumbnail: obj.imageUrl});

        });	
	}

	submitFrm(e) {
		e.preventDefault();
		
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
		obj.isFeatured = this.state.isFeatured;
		let current = firebase.database.ServerValue.TIMESTAMP;
		obj.created_dt = current;
		console.log('obj is ', obj);
		return;
		var url = FirebaseConstant.basePath + '/list/' + this.props.match.params.list + '/videos';
		console.log('url is ', url);
		var uniqueID = firebaseDatabase.ref(url).push(obj).key;
		console.log('uniqueId is ', uniqueID);
		if (!this.state.categories) return;
		
		let catUrl = FirebaseConstant.basePath + '/list/' + this.props.match.params.list + '/categories';
		console.log('catUrl: ', catUrl);
		for (let k in this.state.categories) {
			console.log('k is ', k);
			let tmp = k.split('|');
			console.log('tmp is ', tmp);
			let cat = tmp[0];
			let subcat = null;
			console.log('lenght is ', tmp.length);
			if (tmp.length === 2) {
				subcat = tmp[1];
				firebaseDatabase.ref(catUrl).child(cat).child('subcategories').child(subcat).child('videos').child(uniqueID).set(current);
			} else {
				firebaseDatabase.ref(catUrl).child(cat).child('videos').child(uniqueID).set(current);
			}
			
		}
	}

	changeVideoUrl(e) {
		if (!e.target.value) {
			return;	
		}
		let videoUrl = utubeIDGrabber(e.target.value);
		this.getVideoDetails(videoUrl);
		this.setState({videoInput: e.target.value, videoInputId: videoUrl});
	}
	
	chooseCategory(e) {
		this.setState({categories: e});
	}

	render() {
		console.log('this state: ', this.state);
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<h3>Add Videos</h3>
						<form onSubmit={this.submitFrm.bind(this)}>
							<VideosCategory chooseCategory={this.chooseCategory.bind(this)} />
							<div className="form-group">
								<label>Youtube Video URL / ID</label>
								<input type="text" className="form-control" placeholder="Enter Video ID or URL" value={this.state.videoInput} onChange={this.changeVideoUrl.bind(this)} />
							</div>
							<div className="form-group">
								<label>Title *</label>
								<input type="text" className="form-control" placeholder="Enter Title" value={this.state.videoTitle} onChange={(e) => {
									this.setState({videoTitle: e.target.value});	
								}} />
							</div>
							<div className="form-group">
								<label>Description</label>
								<textarea className="form-control" placeholder="Enter Description" rows="5" value={this.state.videoDescription} onChange={(e) => {
									this.setState({videoDescription: e.target.value});	
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
							<div className="form-group">
								<label>Movie Thumbnail URL</label>
								<input type="text" className="form-control" placeholder="Enter Thumbnail" value={this.state.videoThumbnail} onChange={(e) => {
									this.setState({videoThumbnail: e.target.value});	
								}} />
							</div>
							<div className="form-group">
								<label>Featured Video</label>
								<input type="checkbox" onClick={(e) => {
									this.setState({isFeatured: e.target.checked});	
								}} />
							</div>
							<br />
							<button type="submit" className="btn btn-primary form-control">Add Video</button>
						</form>
					</div>
					<div className="col-md-6">
						<h3>View Videos</h3>
					</div>
				</div>
			</div>
		);
	}
}

export default Videos;