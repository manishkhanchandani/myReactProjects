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
			quiz_rows: null,
			users_info: {}
		};
	}
	
	getQuiz() {
		var url = FirebaseConstant.basePath + '/quiz';
		var ref = firebaseDatabase.ref(url).orderByChild('created_dt').limitToLast(500);
		var usersUrl = FirebaseConstant.basePath + '/users';
		ref.on('value', (snapshot) => {
			var result = snapshot.val();
			var arr = [];
			for (var key in result) {
				var formattedData = result[key];
				formattedData.id = key;
				arr.push(formattedData);
				if (!this.state.users_info[formattedData['from_user_id']]) {
					var usersRef = firebaseDatabase.ref(usersUrl).child(formattedData['from_user_id']);
					usersRef.once('value', (usersSnapshot) => {
						var usersInfo = this.state.users_info;
						usersInfo[formattedData['from_user_id']] = usersSnapshot.val();
						this.setState({users_info: usersInfo});				   
					});
				}
			}
			
			this.setState({quiz_rows: arr});
		});
	}
	
	updateField(field, e) {
		var obj = {};
		obj.category_id = e.target.value;
		this.setState(obj);
	}
	
	createQuiz(e) {
		e.preventDefault();
		var url = 'http://localhost/project2017/qz/api/quiz_display.php?category_id='+this.state.category_id;
		axios.get(url)
		  .then(function (response) {
			var data = response.data;
			var url = FirebaseConstant.basePath + '/quiz';
			var obj = {};
			obj.from_user_id = localStorage.getItem('uid');
			obj.to_user_id = null;
			obj.created_dt = firebase.database.ServerValue.TIMESTAMP;
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
		console.log('state is ', this.state);
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
                                            ncols = {["col-md-3" , "col-md-3" , "col-md-3", "col-md-3"]}
                                            proprieties = {[
                                                {
                                                 label : "Contract",
												 name: "category_id",
                                                 type : "radio",
                                                 bsClass : "form-control",
                                                 defaultValue : "44",
												 onChange: this.updateField.bind(this, 'contracts')
                                                },
                                                {
                                                 label : "Criminal",
												 name: "category_id",
                                                 type : "radio",
                                                 bsClass : "form-control",
                                                 defaultValue : "45",
												 onChange: this.updateField.bind(this, 'criminal')
                                                },
                                                {
                                                 label : "Torts",
												 name: "category_id",
                                                 type : "radio",
                                                 bsClass : "form-control",
                                                 defaultValue : "46",
												 onChange: this.updateField.bind(this, 'torts')
                                                },
                                                {
                                                 label : "FYLS 1980 Exam",
												 name: "category_id",
                                                 type : "radio",
                                                 bsClass : "form-control",
                                                 defaultValue : "47",
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
                                                ID
                                            </th>
                                            <th>
                                                Created By
                                            </th>
                                            <th>
                                                Created On
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
														{prop.id}
													</td>
													<td>
														{this.state.users_info[prop.from_user_id] && this.state.users_info[prop.from_user_id].displayName}
													</td>
													<td>
														{prop.created_dt}
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