import React, { Component } from 'react';

class A11 extends Component {
  render() {
    return (
      <span className="label label-default" >{this.props.name} / {this.props.age} / {this.props.gender} / {this.props.city} / {this.props.state} / {this.props.country}</span>
    );
    
  }
}

export default A11;
