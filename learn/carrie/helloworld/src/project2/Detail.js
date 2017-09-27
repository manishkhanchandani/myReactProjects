 import React, {Component} from 'react';

class Detail extends Component {
  render() {
    	return (
			<div>
			Detail - {this.props.match.params.id}
			<br />
			Title is - {this.props.match.params.title}
			</div>
    );
  }
}

export default Detail;
