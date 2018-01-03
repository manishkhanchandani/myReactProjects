import React, {Component} from 'react';
import './Messages.css';
import {timeAgo} from '../../utilities/functions.js';
import Paginator from '../../utilities/Paginator.js';

class Messages extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			pageNumber: 1,
			filterTerm: null
		};
	}

	onActivePageChange(page) {
		this.setState({pageNumber: page});
	}

	render() {
		if (!this.props.records) {
			return null;	
		}
		
		var records = JSON.parse(JSON.stringify(this.props.records));//cloning
		
		//FILTER RESULTS
		if (this.state.filterTerm) {
			records = records.filter((record) => {
				return (record.message.toLowerCase().indexOf(this.state.filterTerm.toLowerCase()) >= 0); 
			});
		}	
		//pagination
		const maxRows = 5;
		const pageNum = this.state.pageNumber - 1;
		const startRow = pageNum * maxRows;
		const totalRows = records.length;
		const totalPages = Math.ceil(totalRows/maxRows);
		const myArrayConverted = records.splice(startRow, maxRows);
	
		//pagination component
		const paginationProps = {
		  activePage: this.state.pageNumber,
		  items: totalPages,//number of pages
		  onSelect: this.onActivePageChange.bind(this),
		  maxButtons: 3, //numer of buttons to display
		  boundaryLinks: true,
		  first: true,
		  last: true,
		  next: true,
		  prev: true
		}

		return (
			<div className="messages">
				<br />
				<input type="text" placeholder="Filter" className="form-control" onChange={(e) => {this.setState({filterTerm: e.target.value, pageNumber: 1});}} />
				{
					myArrayConverted.map((value, key) => {
						var img = '';
						var name = '';
						var darkerClass = 'container_chat';
						var timeLocation = 'time-right';
						img = value.image;
						name = value.display_name;
						if (value.receiver) {
							darkerClass = 'container_chat darker';
							timeLocation = 'time-left';
						}
						var strTime = timeAgo(value.message_date);
						return (<div key={key} className={darkerClass}>
						  <img src={img} alt={name} title={name} />
						  <div className="pull-right name">{name}</div>
						  <p>{value.message}</p>
						  <span className={timeLocation}>{strTime}</span>
						</div>)					
					})	
				}
				<hr />
				<Paginator {...paginationProps} />
				
			</div>
		);
	}
}

export default Messages;