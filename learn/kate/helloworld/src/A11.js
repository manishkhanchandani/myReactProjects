import React, { Component } from 'react';


class A11 extends Component {
  render() {
    return (
			<div>
			<h1>{this.props.name}</h1>
			<p><b>age:</b> {this.props.age}</p>
		
      </div>
    );
  }
}

export default A11;
