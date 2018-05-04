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
	changePageNum(e) {
		let num = parseInt(e.target.value, 10);
		this.props.onSelect(num);	
	}
	render() {
		return (
			<div className="text-right">
				<Pagination
				  bsSize="small"
				  {...this.props}
				/>
				<div><span  style={{fontSize:"12px", fontWeight:"bold"}}>Page Number: </span><input type="text" value={this.props.activePage} onChange={this.changePageNum.bind(this)} size="5" /></div>
			</div>
		);
	}
}

export default Paginator;