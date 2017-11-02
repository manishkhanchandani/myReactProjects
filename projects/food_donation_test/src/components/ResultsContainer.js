import React, {Component} from 'react';
import Results from './Results.js';
import {distance} from '../utilities/functions.js';
import Pagination from '../utilities/Pagination';

class ResultsContainer extends Component {

	constructor() {
        super();

        this.state = {
            items:  this.props.data,
            pageOfItems: []
        };

        this.onChangePage = this.onChangePage.bind(this);
    }
	
	onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

	render() {
		if (!this.props.data) {
			return null;	
		}
		
		var arr = [];
		for (var key in this.props.data) {
			var formattedData = this.props.data[key];
			var dist = distance(37.773972, -122.431297, formattedData.location.lat, formattedData.location.lng);
			formattedData.distance = dist.toFixed(2);
			arr.push(formattedData);
		}
		
		if (arr.length <= 0) {
			return null;	
		}
		
		return (
			<div className="row">
				{ arr.map((value, key) => {
						return <div className="col-md-6"  key={key}><Results data={value} /></div>
					})
				}
				<h1>React - Pagination Example with logic like Google</h1>
				{this.state.pageOfItems.map((value, key) => {
					return <div className="col-md-6"  key={key}><Results data={value} /></div>
				})}
				<Pagination items={this.state.items} onChangePage={this.onChangePage} />
			</div>
		);
	}
}

export default ResultsContainer;