import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as quizActions from './QuizAction.js';
import {getUID} from '../auth/AuthAction.js';
import {Link} from 'react-router-dom'; 

class QuizStartedList extends Component {
	
	componentDidMount() {
		this.props.callStartedQuiz();
	}

	render() {
		if (!this.props.quizReducer.started_data) {
			return null;	
		}
		const uid = getUID();
		return (
			<div>				
				<h3>Current Quiz Running Challenges</h3>
				{
					this.props.quizReducer.started_data &&
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
								this.props.quizReducer.started_data.map((value, key) => {
									let url = '/quiz/' + value.id;
									return <tr key={key}>
										<td>ID: <b>{value.id}</b><br />{value.topic}</td>
										<td><img src={value.user1_photoURL} alt={value.user1_creator} /></td>
										<td>{value.user1_creator}</td>
										<td><img src={value.user2_photoURL} alt={value.user2_creator} /></td>
										<td>{value.user2_creator}</td>
										<td>
										{
											(uid === value.user1_uid || uid === value.user2_uid) ?
											<Link to={url}>Play</Link>
											:
											<Link to={url}>Watch</Link>
										}
										</td>
										<td>Pending</td>
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
		callStartedQuiz: () => {
			quizActions.startedQuiz(dispatch);
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizStartedList);