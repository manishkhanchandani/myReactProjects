import React, { Component } from 'react';
import {connect} from 'react-redux';
import {sample} from '../actions/MyAction.js';

class App extends Component {
  render() {
	  console.log(this.props);
    return (
      <div>
	  	Hello World
		<button onClick={() => {this.props.callSample()}}>Click Me</button><br /><br />
		Data is {this.props.sample.data}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		sample: state.MyReducer
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		callSample: () => {
			dispatch(sample());	
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
