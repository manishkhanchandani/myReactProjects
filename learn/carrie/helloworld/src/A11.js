import React, { Component } from 'react';

class A11 extends Component {
  render() {
    return (
		<div>
		<h1>{this.props.name}</h1>
		<p><b>Age: {this.props.age}</b></p>
		<p><b>Gender: {this.props.gender}</b></p>
		<p><b>City: {this.props.city}</b></p>
		<p><b>State: {this.props.state}</b></p>
		<p><b>Country: {this.props.country}</b></p>
		</div>
    );
  }
}

export default A11;
