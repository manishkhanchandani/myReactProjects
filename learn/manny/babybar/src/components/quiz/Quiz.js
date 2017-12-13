import React, {Component} from 'react';

import CategoriesJson from './quiz_categories.json';

class Quiz extends Component {

	createQuiz(e) {
		e.preventDefault();
	}
	
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>California Baby Bar Quiz Challenges</h1>
						<p>Challenge quiz with friends and others</p>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<h3>Current Quiz Challenges</h3>
						
					</div>
					<div className="col-md-6">
						<h3>Create Quiz :: Choose Topic</h3>
						{
							CategoriesJson && 
							<ul className="list-group">
							{
								CategoriesJson.map((value, key) => {
									return <li key={key} className="list-group-item"><a href="">{value.name}</a></li>				
								})
							}
							</ul>
						}
					</div>
				</div>
			</div>
		);
	}
}

export default Quiz;