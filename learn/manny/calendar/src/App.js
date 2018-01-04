import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as myAction from './MyAction.js';

class App extends Component {
	
	submitBtn() {
		this.props.changeError('');
		//validate the date
		let dt = this.props.myReducer.date;
		let d1 = new Date();
		let d2 = new Date(dt);
		console.log(d1.toString());
		console.log(d2.toString());
		
		if (d2.getTime() < d1.getTime()) {
			this.props.changeError('old date not allowed');
			return;
		}
		
		if (this.props.myReducer.data[dt]) {
			this.props.changeError('date already booked');
			return;
		}
		
		this.props.changeData(dt, dt);
	}

  render() {
	  const data = this.props.myReducer.data;
	  let myArray = [];
	  if (Object.keys(data).length > 0) {
		  for (let key in data) {
			myArray.push(data[key]);  
		  }
	  }

    return (
      <div>
	  	<h3>Calendar Application</h3>
		{
			this.props.myReducer.error && 
			<div><b>{this.props.myReducer.error}</b></div>
		}
		<p>Enter date: <input type="text" value={this.props.myReducer.date} onChange={(e) => {this.props.updateDate(e.target.value);}} /></p>
		<p><input type="button" value="Submit" onClick={this.submitBtn.bind(this)} /></p>

		{
			myArray && 
			<ul>
				{
					myArray.map((value, key) => {
						return <li key={key}>
							{value} <a href="" onClick={(e) => {e.preventDefault(); this.props.setEditFlag(value);}}>Edit</a> | <a href="" onClick={(e) => {e.preventDefault(); this.props.deleteRec(value);}}>Delete</a>
							{
								this.props.myReducer.edit === value &&
								<div>
									<p>Enter date: <input type="text" defaultValue={value} ref="editData" /></p>
									<p><input type="button" value="Submit" onClick={(e) => {this.props.editRec(value, this.refs.editData.value, this.refs.editData.value);}} /></p>
								</div>
							}
						</li>
					})	
				}
			</ul>
		}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
	return {
		myReducer: state.MyReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateDate: (newDate) => {
			dispatch(myAction.updateDate(newDate));
		},
		changeError: (msg) => {
			dispatch(myAction.changeError(msg));	
		},
		changeData: (key, data) => {
			dispatch(myAction.changeData(key, data));	
		},
		deleteRec: (key) => {
			dispatch(myAction.deleteRec(key));	
		},
		setEditFlag: (key) => {
			dispatch(myAction.setEditFlag(key));	
		},
		editRec: (oldKey, key, data) => {
			dispatch(myAction.editRec(oldKey, key, data));	
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(App);