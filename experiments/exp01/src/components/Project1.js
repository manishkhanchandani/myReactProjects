import React, {Component} from 'react';

import {connect} from 'react-redux';
import {query1, query2} from '../actions/MyAction.js';

class Project1 extends Component {
	componentDidMount() {
		this.props.func1();
		this.props.func2();
	}
	render() {
		return (
			<div className="container">
				<h1>Project</h1>
				
				<hr />
				<div className="row">
					<div className="col-md-6">
						<div>Content 1 will Load here:</div>
						{
						this.props.myReducer.query1Data && this.props.myReducer.query2Data
						&& this.props.myReducer.query1Data.map((value, index) => {
							return (<div key={index}><h3>{value.title}</h3><p>{value.body}</p><hr /></div>);									
						})
						}
					</div>
					<div className="col-md-6">
						<div>Content 2 will Load here:</div>
						{
						this.props.myReducer.query2Data && this.props.myReducer.query1Data
						&& <div><h3>{this.props.myReducer.query2Data.title}</h3><p>{this.props.myReducer.query2Data.body}</p><hr /></div>
						}
					</div>
				</div>
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
    func1: () => {
		dispatch(query1());
    },
    func2: () => {
		dispatch(query2());
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Project1);