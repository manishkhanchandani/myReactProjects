import React, {Component} from 'react';
import './View1.css';
import {processRecords} from '../../utilities/functions.js';
import Paginator from '../../utilities/Paginator.js';


class View1Details extends Component {
	render() {
		const videoData = this.props.videoData;
		
		var myDate = new Date(videoData.created_dt);
		var myDateStr = myDate.toString();
		
		let url = '/'+this.props.list_id+'/detail/' + videoData._id;
		
		
		return (
			<div className="col-md-12">
				<div className="brdr bgc-fff pad-10 box-shad btm-mrg-20 property-listing">
					<div className="media">
						<a className="pull-left" href="" target="_parent">
						<img alt="Record" className="img-responsive" src={videoData.videoThumbnail} /></a>

						<div className="clearfix visible-sm"></div>

						<div className="media-body fnt-smaller">

							<h4 className="media-heading">
							  <a href={url} target="_blank">{videoData.videoTitle}</a></h4>


							
							<p className="hidden-xs">{videoData.videoDescription}</p>
							<p className="hidden-xs">{myDateStr}</p>
							<span className="fnt-smaller fnt-lighter fnt-arial">{videoData.tags}</span>
						</div>
					</div>
				</div>
			</div>		
		);	
	}
}

class View1 extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			filterTerm: '',
			pageNumber: 1
		};
	}

	onActivePageChange(page) {
		this.setState({pageNumber: page});
	}
	
	render() {
		console.log('props are ', this.props);
		if (!this.props.data) {
			return null;	
		}
		
		let videos = null;
		let myArrayConverted = null;
		let paginationProps = null;
		
		if (this.props.data.videos) {
			videos = [];
			for (let k in this.props.data.videos) {
				let obj = this.props.data.videos[k];
				obj._id = k;
				videos.push(obj);						
			}	
			let recObject = processRecords(videos, null, this.state.filterTerm, ['videoTitle', 'categories', 'videoDescription'], 50, this.state.pageNumber, this.onActivePageChange.bind(this));
			myArrayConverted = recObject.myArrayConverted;
			paginationProps = recObject.paginationProps;
		}
		
		
		return (
			<div className="container">
				<div className="row ">
					<div className="col-md-4">
						
						
						
						<h3>Search</h3>
						<input type="text" placeholder="Filter" className="form-control" onChange={(e) => {this.setState({filterTerm: e.target.value, pageNumber: 1});}} />
						
					</div>
					<div className="col-md-8">
						<div className="row resultsContainer">
							{
								myArrayConverted &&
									<div>
										{
											myArrayConverted.map((value, key) => {
												return <View1Details videoData={value} key={key} list_id={this.props.list_id}  />	
											})
										}
									</div>
									
							}
							
							<hr />
							<Paginator {...paginationProps} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default View1;