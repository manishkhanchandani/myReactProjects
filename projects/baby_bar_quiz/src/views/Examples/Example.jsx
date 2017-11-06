import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import Paginator from 'views/Paginator/Paginator.jsx';

class Example1 extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			term: null,
			sortingField: null,
			pageNumber: 1
		};
		
		this.onActivePageChange = this.onActivePageChange.bind(this);
	}
	
	onActivePageChange(page) {
		this.setState({pageNumber: page});
	}

	dynamicSort(property) {
		var sortOrder = 1;
		if(property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a,b) {
			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}
	}

    render() {
		var arr = [
				   	{name: 'manish', last_name: 'khanchandani', gender: 'male', age: 43},
					{name: 'nikhil', last_name: 'khanchandani', gender: 'male', age: 17},
					{name: 'renu', last_name: 'khanchandani', gender: 'female', age: 67},
					{name: 'bhani', last_name: 'khanchandani', gender: 'female', age: 40},
					{name: 'nihar', last_name: 'khanchandani', gender: 'male', age: 2},
					{name: 'kavita', last_name: 'valecha', gender: 'female', age: 45},
					{name: 'alka', last_name: 'golani', gender: 'female', age: 50}
				   ];
		
		console.log(arr);
		console.log('state is ', this.state);
		//filtering
		if (this.state.term) {
			arr = arr.filter((item) => {
				return (item.name.toLowerCase().indexOf(this.state.term.toLowerCase()) >= 0 || item.last_name.toLowerCase().indexOf(this.state.term.toLowerCase()) >= 0 || item.gender.toLowerCase().indexOf(this.state.term.toLowerCase()) >= 0 || item.age === parseInt(this.state.term.toLowerCase(), 10));
			});	
		}
		
		//sorting
		if (this.state.sortingField) {
			arr.sort(this.dynamicSort(this.state.sortingField));
		}
		//pagination
		var maxRows = 3;
		var pageNum = this.state.pageNumber - 1;
		var startRow = pageNum * maxRows;
		var totalRows = arr.length;
		var totalPages = Math.ceil(totalRows/maxRows);
		var arrConverted = arr.splice(startRow, maxRows);
		console.log('arrConverted: ', arrConverted);
		console.log('max: ', maxRows, ', pageNum: ', pageNum, ', start: ', startRow, ', totalRows: ', totalRows, ', total Pages: ', totalPages);
		const paginationProps = {
		  activePage: this.state.pageNumber,
		  items: totalPages,//number of pages
		  onSelect: this.onActivePageChange,
		  maxButtons: totalPages, //numer of buttons to display
		  boundaryLinks: true,
		  first: true,
		  last: true,
		  next: true,
		  prev: true
		}
		
        return (
            <div className="content">
				<div>
				Filter: <input type="text" onChange={(e) => {this.setState({term: e.target.value, pageNumber: 1});}} />
				Sorting Field: <input type="text" onChange={(e) => {this.setState({sortingField: e.target.value, pageNumber: 1});}} />
				
				</div>
				<Paginator {...paginationProps} />
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Users"
                                category="Members"
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <Table striped hover>
                                        <thead>
											<tr>
                                            <th>
                                                id
                                            </th>
                                            <th>
                                                name
                                            </th>
                                            <th>
                                                last name
                                            </th>
                                            <th>
                                                gender
                                            </th>
                                            <th>
                                                age
                                            </th>
											</tr>
                                        </thead>
                                        <tbody>
                                            {
                                                arrConverted.map((prop,key) => {
                                                    return (
													<tr key={key}>
													<td>
														{key + 1}
													</td>
													<td>
														{prop.name}
													</td>
													<td>
														{prop.last_name}
													</td>
													<td>
														{prop.gender}
													</td>
													<td>
														{prop.age}
													</td>
													</tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>
						
						

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Example1;
