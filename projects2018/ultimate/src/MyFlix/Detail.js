import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import YouTube from 'react-youtube';
import {defaultList} from './MyFlixAction.js';

class Detail extends Component {
	constructor(props) {
		super(props);
		
		const list_id = this.props.match.params.list ? this.props.match.params.list : defaultList;
		this.state = {
			list_id: list_id,
			data: null
		};
	}
	
	componentDidMount() {
		let currentUrl = 'http://myflix.info/' + this.state.list_id + '/detail/' + this.props.match.params.video_id;
		let apiUrl = 'http://api.mkgalaxy.com/handsome.php?url=' + encodeURIComponent(currentUrl);
		fetch(apiUrl, {
			method: 'GET'	  
		})
		.then((response) => {
			return response.json();	   
		})
		.then((record) => {
			console.log('record is ', record);	
		})
		.catch((err) => {
			console.log(err);
		});
		
		let url = FirebaseConstant.basePath + '/list/' + this.state.list_id + '/videos/' + this.props.match.params.video_id;
		let ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			if (!snapshot.exists()) {
				this.setState({data: null});
				return;
			}
			let record = snapshot.val();
			this.setState({data: record});
		});
	}

	render() {		
		if (!this.state.data) return null;
		
		const opts = {
		  playerVars: { // https://developers.google.com/youtube/player_parameters
			autoplay: 0
		  }
		};
		
		var url = 'http://myflix.info/' + this.state.list_id + '/detail/' + this.props.match.params.video_id;
		var encodeUrl = encodeURIComponent(url);
		return (
			<div className="container">
				<h3>{this.state.data.videoTitle}</h3>
				<div className="fb-share-button" data-href={url} data-layout="button_count" data-size="large" data-mobile-iframe="true"><a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeUrl}&amp;src=sdkpreparse`} className="fb-xfbml-parse-ignore">Share</a></div>
				<hr />
				<div className="embed-responsive embed-responsive-16by9">
					<YouTube
					videoId={this.state.data.videoInputId}
					opts={opts}
					className="embed-responsive-item"
					/>
				</div>
			</div>
		);
	}
}

export default Detail;