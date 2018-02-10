import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import YouTube from 'react-youtube';

class Detail extends Component {
	constructor(props) {
		super(props);
		
		const list_id = this.props.match.params.list ? this.props.match.params.list : FirebaseConstant.defaultListId;
		this.state = {
			list_id: list_id,
			data: null
		};
	}
	
	componentDidMount() {
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
		console.log('detail page: ', this.state);
		
		if (!this.state.data) return null;
		
		const opts = {
		  playerVars: { // https://developers.google.com/youtube/player_parameters
			autoplay: 0
		  }
		};
		
		return (
			<div className="container">
				<h3>{this.state.data.videoTitle}</h3>
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