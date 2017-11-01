import React, {Component} from 'react';

class Results extends Component {
	render() {
		console.log('res is ', this.props.data);
		return (
			<div className="media">
			  <div className="media-left">
				<a href="">
				  <img className="media-object myImage" src={this.props.data.imageUrl} alt={this.props.data.title} title={this.props.data.title} />
				</a>
			  </div>
			  <div className="media-body">
				<h4 className="media-heading">{this.props.data.title}</h4>
				<p>{this.props.data.description}</p>
				<p>{this.props.data.location.formatted_address}</p>
				<p>Distance: {this.props.data.distance} mi</p>
			  </div>
			</div>
		);
	}
}

export default Results;