import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as quizActions from './QuizAction.js';
import {getUID} from '../auth/AuthAction.js';
import {Link} from 'react-router-dom'; 

class QuizCompletedList extends Component {
	
	componentDidMount() {
		this.props.callCompletedQuiz();
	}

	render() {
		if (!this.props.quizReducer.completed_data) {
			return null;	
		}
		const uid = getUID();
		return (
			<div>				
				<h3>Completed Quiz Challenges</h3>
				{
					this.props.quizReducer.completed_data &&
					<div className="table-responsive">
						<table className="table table-striped">
							<tbody>
							<tr>
								<th>Topic</th>
								<th></th>
								<th>Creator</th>
								<th></th>
								<th>Challenger</th>
								<th>Action</th>
								<th>Winner</th>
							</tr>
							{
								this.props.quizReducer.completed_data.map((value, key) => {
									let url = '/quiz/' + value.id;
									let winner = 'Draw';
									let point1 = parseInt(value[value.user1_uid].points, 10);
									let point2 = parseInt(value[value.user2_uid].points, 10);
									if (point1 > point2) {
										winner = value.user1_creator;
									} else if (point1 < point2) {
										winner = value.user2_creator;
									}
									return <tr key={key}>
										<td><b>{value.dt}</b><br />ID: <b>{value.id}</b><br />{value.topic}</td>
										<td><img src={value.user1_photoURL} alt={value.user1_creator} /></td>
										<td>{value.user1_creator}</td>
										<td><img src={value.user2_photoURL} alt={value.user2_creator} /></td>
										<td>{value.user2_creator}</td>
										<td>
										<Link to={url}>Watch</Link>
										</td>
										<td>{winner}</td>
									</tr>
								})
							}
							
							</tbody>
						</table>
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		quizReducer: state.QuizReducer
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		callCompletedQuiz: () => {
			quizActions.completedQuiz(dispatch);
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCompletedList);