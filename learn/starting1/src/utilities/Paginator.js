import React, {Component} from 'react';
import { Pagination } from 'react-bootstrap';

/*
Usage
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
<Paginator {...paginationProps} />
*/


class Paginator extends Component {
	render() {
		return (
			<div className="text-right">
				<Pagination
				  bsSize="small"
				  {...this.props}
				/>
			</div>
		);
	}
}

export default Paginator;