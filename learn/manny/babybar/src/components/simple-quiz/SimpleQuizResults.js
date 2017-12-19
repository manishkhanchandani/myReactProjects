import React, {Component} from 'react';

import {timeAgo} from '../../utilities/functions.js';

class SimpleQuizResults extends Component {
	render() {
		console.log('ppp: ', this.props);
		if (!this.props.quizDetails) {
			return null;	
		}
		return (
			<div className="results">
				<h3>Results</h3>
				
				<div className="row">
					<div className="col-md-12">
						<b>Total:</b> {this.props.quizDetails.total}
					</div>
					<div className="col-md-6">
						{timeAgo(this.props.quizDetails.created_dt)}
					</div>
					<div className="col-md-6">
					
					</div>
					{
						this.props.quizDetails.details.map((value, key) => {
							return <div key={key} className="col-md-12">
								<div className="question">Question {key + 1}. {value.question}?</div>
							</div>									
						})
					}
					
				</div>
			</div>
		);
	}
}

export default SimpleQuizResults;