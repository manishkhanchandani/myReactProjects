import React, {Component} from 'react';
import {
    Grid, Row, Col, Table
} from 'react-bootstrap';

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import axios from 'axios';

import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';

class QuizNew extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			category_id: null,
			category: null,
			quiz_rows: null,
			users_info: {},
			currentTime: null
		};
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
	
	processUser(formattedData)
	{
		var usersUrl = FirebaseConstant.basePath + '/users';
		if (this.state.users_info[formattedData['from_user_id']]) {
			return;	
		}
		
		var usersRef = firebaseDatabase.ref(usersUrl).child(formattedData['from_user_id']);
		usersRef.once('value', (usersSnapshot) => {
			var usersInfo = this.state.users_info;
			usersInfo[formattedData['from_user_id']] = usersSnapshot.val();
			this.setState({users_info: usersInfo});				   
		});
	}
	
	startTimer(duration, display) {
		var timer = duration, minutes, seconds;
		var myVar = setInterval(function () {
			minutes = parseInt(timer / 60, 10)
			seconds = parseInt(timer % 60, 10);
	
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
	
			display.textContent = minutes + ":" + seconds;
	
			if (--timer < 0) {
				timer = duration;
			}
		}, 1000);
		//clearInterval(myVar);
	}

	getQuiz() {
		var CurrentDate = new Date();
		var url = FirebaseConstant.basePath + '/quiz';
		var ref = firebaseDatabase.ref(url).orderByChild('created_dt').limitToLast(500);
		ref.on('value', (snapshot) => {
			var result = snapshot.val();
			var arr = [];
			for (var key in result) {
				var formattedData = result[key];
				formattedData.id = key;
				
				var date = new Date(formattedData.created_dt);
				var diff = CurrentDate.getTime() - date.getTime();
				if (diff < 0) diff = 0;
				diff = Math.ceil(diff / 1000);
				formattedData.seconds = diff;
				console.log(date.getTime());
				arr.push(formattedData);
				this.processUser(formattedData);
			}
			arr.sort(this.dynamicSort('-created_dt'));
			console.log(arr);
			this.setState({quiz_rows: arr});
		});
	}
	
	updateField(field, e) {
		var obj = {};
		obj.category_id = e.target.value;
		obj.category = e.target.title;
		this.setState(obj);
	}
	
	createQuiz(e) {
		e.preventDefault();
		var url = 'http://localhost/project2017/qz/api/quiz_display.php?category_id='+this.state.category_id;
		axios.get(url)
		  .then((response) => {
			var data = response.data;
			var url = FirebaseConstant.basePath + '/quiz';
			var obj = {};
			obj.from_user_id = localStorage.getItem('uid');
			obj.to_user_id = null;
			var date = new Date();
			obj.created_dt = date.getTime();
			obj.category = this.state.category;
			obj.status = 'Pending';
			obj.data = [];
			data.data.map((record, index) => {
				obj.data.push(record);
				return record;
			});
			var uniqueID = firebaseDatabase.ref(url).push(obj).key;
			console.log('unique id is ', uniqueID);
		
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}
	
	componentDidMount() {
		this.getQuiz();
	}
	
    render() {
		//console.log('state is ', this.state);
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={6}>
                            <Card
                                title="Create New Quiz"
                                content={
                                    <form onSubmit={this.createQuiz.bind(this)}>
                                        <FormInputs
                                            ncols = {["col-md-6" , "col-md-6"]}
                                            proprieties = {[
                                                {
                                                 label : "Contract",
												 name: "category_id",
                                                 type : "radio",
                                                 bsClass : "form-control",
                                                 defaultValue : "44",
												 title: 'Contract',
												 onChange: this.updateField.bind(this, 'contracts')
                                                },
                                                {
                                                 label : "Criminal",
												 name: "category_id",
                                                 type : "radio",
                                                 bsClass : "form-control",
                                                 defaultValue : "45",
												 title: 'Criminal',
												 onChange: this.updateField.bind(this, 'criminal')
                                                }
                                            ]}
                                        />
										<FormInputs
                                            ncols = {["col-md-6" , "col-md-6"]}
                                            proprieties = {[
                                                {
                                                 label : "Torts",
												 name: "category_id",
                                                 type : "radio",
                                                 bsClass : "form-control",
                                                 defaultValue : "46",
												 title: 'Torts',
												 onChange: this.updateField.bind(this, 'torts')
                                                },
                                                {
                                                 label : "FYLS Simulation Test",
												 name: "category_id",
                                                 type : "radio",
                                                 bsClass : "form-control",
                                                 defaultValue : "47",
												 title: 'FYLS Simulation Test',
												 onChange: this.updateField.bind(this, 'babybar_1980')
                                                }
                                            ]}
                                        />
                                        <Button
                                            bsStyle="info"
                                            pullRight
                                            fill
                                            type="submit"
                                        >
                                            Create New Quiz
                                        </Button>
                                        <div className="clearfix"></div>
                                    </form>
                                }
                            />
                        </Col>
						<Col md={6}>
							<Card
                                title="Quiz"
                                category="Choose any quiz"
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <Table striped hover>
                                        <thead>
											<tr>
                                            <th>
                                                Category
                                            </th>
                                            <th>
                                                Created By
                                            </th>
                                            <th>
                                                Created On
                                            </th>
                                            <th>
                                                ID
                                            </th>
                                            <th>
                                                Action
                                            </th>
											</tr>
                                        </thead>
                                        <tbody>
                                            { this.state.quiz_rows &&
                                                this.state.quiz_rows.map((prop, key) => {
                                                    return (
													<tr key={key}>
													<td>
														{prop.category} {prop.seconds}
													</td>
													<td>
														{this.state.users_info[prop.from_user_id] && this.state.users_info[prop.from_user_id].displayName}
													</td>
													<td>
														{prop.created_dt}
													</td>
													<td>
														{prop.id}
													</td>
													<td>
														
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
                </Grid>>
            </div>
        );
    }
}

export default QuizNew;