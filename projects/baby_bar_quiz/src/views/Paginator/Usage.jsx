import React, {Component} from 'react';
import Paginator from './Paginator.jsx';

class Usage extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			pageNumber: 1
		};
		
		this.onActivePageChange = this.onActivePageChange.bind(this);
	}
	
	onActivePageChange(page) {
		this.setState({pageNumber: page});
	}
	render() {
		const paginationProps = {
		  activePage: this.state.pageNumber,
		  items: 10,//number of pages
		  onSelect: this.onActivePageChange,
		  maxButtons: 3, //numer of buttons to display
		  boundaryLinks: true,
		  first: true,
		  last: true,
		  next: true,
		  prev: true
		}
		return (
			<div>
				
				<Paginator {...paginationProps} />
			</div>
		);
	}
}

export default Usage;