import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveVideo} from '../MyFlixAction.js';
import YouTube from 'react-youtube';


class ShowUtube extends Component {
	render() {
		
		if (!this.props.myFlixReducer.saveVideo) {
			return null;	
		}
		
		
		if (this.props.value._id !== this.props.myFlixReducer.saveVideo.catDetails._id) {
			return null;
		}
		console.log('showutube: ', this.props);
		
		const opts = {
		  playerVars: { // https://developers.google.com/youtube/player_parameters
			autoplay: 0
		  }
		};

		return (
			<div className="showUtube">
				<div className="embed-responsive embed-responsive-16by9">
					<YouTube
					videoId={this.props.myFlixReducer.saveVideo.videoDetails.videoInputId}
					opts={opts}
					className="embed-responsive-item"
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myFlixReducer: state.MyFlixReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callSaveVideo: (details) => {
			dispatch(saveVideo(details));
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowUtube);