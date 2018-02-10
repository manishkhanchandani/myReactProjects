import React, {Component} from 'react';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import Loader from '../Loader/Loader.js';
import YouTube from 'react-youtube';

class Home extends Component {
	constructor(props) {
		super(props);
		
		const list_id = this.props.match.params.list ? this.props.match.params.list : FirebaseConstant.defaultListId;
		this.state = {
			list_id: list_id,
			list_data: null,
			featured_videos: null,
			all_videos: null
		};
	}
	
	getData() {
		var url = FirebaseConstant.basePath + '/list/' + this.state.list_id;
		var ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			let records = snapshot.val();
			if (!records) return;
			this.setState({list_data: records});
			
			//get featured videos
			this.parseVideos(records);
		});
	}
	
	parseVideos(data) {
		console.log('featured: ', data.videos);
		if (!data.videos) return;
		
		let all_videos = [];
		let featured_videos = [];
		
		for (let k in data.videos) {
			let rec = data.videos[k];
			rec._id = k;
			
			all_videos.push(rec);
			if (rec.videoFeatured) {
				featured_videos.push(rec);
			}
		}
		
		this.setState({all_videos: all_videos, featured_videos: featured_videos});
	}
	
	componentDidMount() {
		this.getData();
	}

	render() {
		console.log('state is ', this.state);
		
		if (!this.state.list_data) {
			return <Loader />	
		}


		let featuredVideos = (this.state.featured_videos && this.state.featured_videos[0]) ? this.state.featured_videos[0] : null;
		if (!featuredVideos && this.state.all_videos && this.state.all_videos[0]) {
			featuredVideos = this.state.all_videos[0];
		}
		
		let featuredVideos2 = (this.state.featured_videos && this.state.featured_videos[1]) ? this.state.featured_videos[1] : null;
		if (!featuredVideos2 && this.state.all_videos && this.state.all_videos[1]) {
			featuredVideos2 = this.state.all_videos[1];
		}
		
		let featuredVideos3 = (this.state.featured_videos && this.state.featured_videos[2]) ? this.state.featured_videos[2] : null;
		if (!featuredVideos3 && this.state.all_videos && this.state.all_videos[2]) {
			featuredVideos3 = this.state.all_videos[2];
		}
		const opts = {
		  playerVars: { // https://developers.google.com/youtube/player_parameters
			autoplay: 0
		  }
		};

		return (
			<div>
				<div className="jumbotron">
					<div className="container">
						<div className="row">
							<div className="col-md-8">
							{
								featuredVideos &&
									  <div className="embed-responsive embed-responsive-16by9">
											<YouTube
											videoId={featuredVideos.videoInputId}
											opts={opts}
											className="embed-responsive-item"
											/>
										</div>
							}
							</div>
							<div className="col-md-4">
								<div className="row">
									<div className="col-md-12">
									{
										featuredVideos2 &&
											  <div className="embed-responsive embed-responsive-16by9">
													<YouTube
													videoId={featuredVideos2.videoInputId}
													opts={opts}
													className="embed-responsive-item"
													/>
												</div>
									}
									</div>
								</div>
								<div className="row">
									<div className="col-md-12">
									{
										featuredVideos3 &&
											  <div className="embed-responsive embed-responsive-16by9">
													<YouTube
													videoId={featuredVideos3.videoInputId}
													opts={opts}
													className="embed-responsive-item"
													/>
												</div>
									}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				
				
				
				
				<section className="section-gray">
					<div className="container">
						<div className="row">
							<div className="col-md-3 text-center">
								<span className="fa-stack fa-lg fa-4x">
								  <i className="fa fa-circle fa-stack-2x fa-color"></i>
								  <i className="fa fa-terminal fa-stack-1x fa-inverse"></i>
								</span>
								<h3>Valid Code</h3>
							</div>
							<div className="col-md-3 text-center">
								<span className="fa-stack fa-lg fa-4x">
								  <i className="fa fa-circle fa-stack-2x fa-color"></i>
								  <i className="fa fa-laptop fa-stack-1x fa-inverse"></i>
								</span>
								<h3>Responsive</h3>
							</div>
							<div className="col-md-3 text-center">
								<span className="fa-stack fa-lg fa-4x">
								  <i className="fa fa-circle fa-stack-2x fa-color"></i>
								  <i className="fa fa-video-camera fa-stack-1x fa-inverse"></i>
								</span>
								<h3>Animation Ready</h3>
							</div>
							<div className="col-md-3 text-center">
								<span className="fa-stack fa-lg fa-4x">
								  <i className="fa fa-circle fa-stack-2x fa-color"></i>
								  <i className="fa fa-gear fa-stack-1x fa-inverse"></i>
								</span>
								<h3>Customizable</h3>
							</div>
						</div>
					</div>
				</section>
				
				
				
				
				Home - {this.state.list_id}
			</div>
		);
	}
}

export default Home;