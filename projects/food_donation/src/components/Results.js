import React, {Component} from 'react';

class Results extends Component {
	render() {
		var distance = '';
		if (this.props.record.distance) {
			distance = 	(<span> (<strong>{this.props.record.distance} mi.</strong>)</span>);
		}
		return (
			<div className="media">
			  <div className="media-left">
				<a href="">
				  <img className="media-object myImage" src={this.props.record.imageUrl} alt="..." />
				</a>
			  </div>
			  <div className="media-body">
				<h4 className="media-heading">{this.props.record.title}</h4>
				<p>{this.props.record.description}</p>
				<p>{this.props.record.location.formatted_address} 
																   
				{distance}
				
				</p>
			  </div>
			</div>
		);
	}
}

export default Results;