import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			display: []
		};
	}
	handleChangeName(e) {
	  this.setState({name: e.target.value});
	}
	handleKeyPress(e) {
		console.log('e is ', e.keyCode);
	  if (e.keyCode === 9) {
		e.preventDefault();
		let display = this.state.display;
		let html = ('<span>' +e.target.value+ ' <a href="">x</a></span>');
		display.push(html);
		this.setState({display: display});
	  } else if (e.keyCode === 8) {
		e.preventDefault();
		
		let display2 = this.state.display;
		display2.pop();
		this.setState({display: display2});
		return alert('hey ho lets go');
	  } else {
		  
  		this.setState({name: e.target.value}); 
	  }
 
}
  render() {
	  console.log(this.state);
    return (
      <div>
		<input type="text" value={this.state.name} onKeyDown={this.handleKeyPress.bind(this)} onChange={this.handleChangeName.bind(this)} />
		<div>{this.state.display}</div>
		<div contenteditable="true" onKeyDown={this.handleKeyPress.bind(this)} onChange={this.handleChangeName.bind(this)}>{this.state.display}</div>
      </div>
    );
  }
}

export default App;
