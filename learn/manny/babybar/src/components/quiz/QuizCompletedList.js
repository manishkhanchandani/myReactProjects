import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as quizActions from './QuizAction.js';
import {Link} from 'react-router-dom'; 
import {processRecords} from '../../utilities/functions.js';
import Paginator from '../../utilities/Paginator.js';

class QuizCompletedList extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			pageNumber: 1,
			filterTerm: null
		}
	}
	
	onActivePageChange(page) {
		this.setState({pageNumber: page});
	}
	
	componentDidMount() {
		this.props.callCompletedQuiz();
	}

	render() {
		if (!this.props.quizReducer.completed_data) {
			return null;	
		}
		const {myArrayConverted, paginationProps} = processRecords(this.props.quizReducer.completed_data, '-created_dt', this.state.filterTerm, ['topic'], 10, this.state.pageNumber, this.onActivePageChange.bind(this));
		return (
			<div>				
				<div className="panel panel-success">
				  <div className="panel-heading">
					<h3 className="panel-title"><b>Completed Quiz Challenges</b></h3>
				  </div>
				  <div className="panel-body">
						{
							myArrayConverted &&
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
										myArrayConverted.map((value, key) => {
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
												<Link to={url}>View</Link>
												</td>
												<td>{winner}</td>
											</tr>
										})
									}
									
									</tbody>
								</table><hr />
								<Paginator {...paginationProps} />
							</div>
						}
					
				  </div>
				</div>
				
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