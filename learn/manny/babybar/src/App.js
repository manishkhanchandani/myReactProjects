import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import {getUID, removeOnline} from './components/auth/AuthAction.js';
import NavMulti from './components/NavMulti.js';
import Home from './components/Home.js';
import Main from './components/Main.js';
import Quiz from './components/quiz/Quiz.js';
import QuizWelcomeScreen from './components/quiz/QuizWelcomeScreen.js';
import EssayIssues from './components/essays/Issues.js';
import IssuesSpotting from './components/essays/IssuesSpotting.js';
import Simulation from './components/essays/Simulation.js';
//import AdminQuizCreate from './components/adminQuiz/Create.js';

import Import1 from './components/imports/Import1.js';
import './App.css';
//import Activities from './components/activities/Activities.js';
//import Chat from './components/chat/Chat.js';

import UserQuizCategories from './components/userQuiz/Categories.js';
import UserQuiz from './components/userQuiz/Quiz.js';
import ChangeUser from './components/admin/ChangeUser.js';
import UserQuizAdd from './components/userQuiz/Add.js';
import QuizPractice from './components/quiz-practice/Practise.js';
import Activities from './components/activities/Activities.js';


import MyQuizPractice from './components/myquiz/MyPractise.js';

//import PractiseQuestion from './components/practise/Question.js';
//import CompleteProcess from './components/complete/Process.js';

class App extends Component {
	
	componentDidMount() {
		
	}
	
	componentWillUnmount() {
		removeOnline();
	}
  render() {
		const uid = getUID();
		if (!uid) {
			return (<Home />);
		}

		return (
			<Router>
				<div>
					<NavMulti />
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<Route exact={true} path="/" component={Main} />
								<Route exact={true} path="/quiz" component={Quiz} />
								<Route exact={true} path="/quiz/:id" component={QuizWelcomeScreen} />
								<Route exact={true} path="/admin/import1" component={Import1} />
								<Route exact={true} path="/essays/issues/:subject/:issue" component={EssayIssues} />
								<Route exact={true} path="/essays/issues/:subject" component={EssayIssues} />
								<Route exact={true} path="/essays/issues" component={EssayIssues} />
								<Route exact={true} path="/essays/issue/spotting/:subject" component={IssuesSpotting} />
								<Route exact={true} path="/essays/issue/spotting/:subject/:id" component={IssuesSpotting} />
								<Route exact={true} path="/simulation/:subject" component={Simulation} />
								<Route exact={true} path="/user-quiz" component={UserQuiz} />
								<Route exact={true} path="/user-quiz/categories" component={UserQuizCategories} />
								<Route exact={true} path="/user-quiz/addQuiz" component={UserQuizAdd} />
								<Route exact={true} path="/admin/changeuser" component={ChangeUser} />
								<Route exact={true} path="/admin/activities" component={Activities} />
								<Route exact={true} path="/quizPractice" component={QuizPractice} />
								<Route exact={true} path="/quizPractice/:uniqueId" component={QuizPractice} />
								<Route exact={true} path="/quizPractice/:uniqueId/filter/:word" component={QuizPractice} />
								<Route exact={true} path="/quizPractice/:subject/:id" component={QuizPractice} />
								
								
								<Route exact={true} path="/qz" component={MyQuizPractice} />
								<Route exact={true} path="/qz/:uniqueId" component={MyQuizPractice} />
								<Route exact={true} path="/qz/:uniqueId/filter/:word" component={MyQuizPractice} />
								<Route exact={true} path="/qz/:subject/:id" component={MyQuizPractice} />
								
								
								{/*<Route exact={true} path="/practice/:subject/:issue" component={PractiseQuestion} />
								<Route exact={true} path="/complete" component={CompleteProcess} />*/}
							</div>
							{/*<div className="col-md-3">
								<Activities />
							</div>*/}
							{
									/*<div className="col-md-3">
								this.props.authReducer.online_users &&
										<div className="panel panel-primary">
											<div className="panel-heading">
												<h3 className="panel-title">Online Users</h3>
											</div>
											<div className="panel-body">
											{
												this.props.authReducer.online_users.map((value, key) => {
													return <div key={key} className="row">
																<div className="col-md-3">
																	<img src={value.img} className="img-responsive" alt={value.name} />
																</div>
																<div className="col-md-9">
																	{value.name} <br />
																	{value.dt}
																</div>
															</div>	  									   
													})
											}
											</div>
										</div>
								
										
							</div>*/}
						</div>
					</div>
				</div>
			</Router>
		);
  }
}

const mapStateToProps = (state) => {
	return {
		authReducer: state.AuthReducer
	}
};

export default connect(mapStateToProps)(App);
