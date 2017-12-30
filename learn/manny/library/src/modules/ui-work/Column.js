import React, {Component} from 'react';
import './Column.css';

class Column extends Component {
	render() {
		return (
			<div className="f-column">
				<div class="video-artwork is-loaded lazy-background-image" data-src="false"></div>
			</div>
		);
	}
}

export default Column;