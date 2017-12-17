import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as quizActions from './QuizAction.js';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';

class QuizChooseTopic extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			categories: null
		};
	}
	
	createQuiz(topic, e) {
		e.preventDefault();
		this.props.callCreateQuiz(topic);
	}
	
	componentDidMount() {
		var url = FirebaseConstant.basePath + '/quiz/categories';
		var ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			var result = snapshot.val();
			var myArray = [];
			for (let key in result) {
				myArray.push(result[key]);
			}
			
			this.setState({categories: myArray});
		});
	}
	render() {
		return (
			<div>
				<div className="panel panel-info">
				  <div className="panel-heading">
					<h3 className="panel-title"><b>Create Quiz :: Choose Topic</b></h3>
				  </div>
				  <div className="panel-body">
					{
						this.state.categories && 
						<ul className="list-group">
						{
							this.state.categories.map((value, key) => {
								return <li key={key} className="list-group-item"><a href="" onClick={this.createQuiz.bind(this, value)}>{value.name}</a></li>				
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

const mapStateToProps = (state) => {
	return {
		quizReducer: state.QuizReducer
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		callCreateQuiz: (topic) => {
			dispatch(quizActions.createQuiz(topic));
		},
		callListQuiz: () => {
			dispatch(quizActions.listQuiz(dispatch));	
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizChooseTopic);