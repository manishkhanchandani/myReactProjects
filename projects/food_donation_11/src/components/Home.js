import React, {Component} from 'react';

import {connect} from 'react-redux';

import ResultContainer from './ResultContainer.js';
import SearchForm from './SearchForm.js';

class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			subObjects: {}
		};
	}

	render() {
		console.log('state is ', this.state);


		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<SearchForm {...this.props} />
					</div>
					<div className="col-md-9">
						<h3>Results</h3>

						<ResultContainer data={this.props.foodReducer.data} />

					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		foodReducer: state.FoodDonationReducer
	}
};

export default connect(mapStateToProps)(Home);
