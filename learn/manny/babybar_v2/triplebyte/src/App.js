import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			0: [
				   'card 1 1',
				   'card 1 2',
				   ],
			1: [
				   'card 2 1',
				   'card 2 2',],
			2: [
				   'card 3 1',
				   'card 3 2',],
			3: [
				   'card 4 1',
				   'card 4 2',]
		};

	}
	
	componentDidMount() {
		let str = localStorage.getItem('saveLocalData');
		let obj = null;
		if (str) {
			obj = JSON.parse(str);
			this.setState(obj);
		}
	}
	
	saveDataLocally() {
		localStorage.setItem('saveLocalData', JSON.stringify(this.state));
	}
	
	move(key, to, from, e) {
		e.preventDefault();
		
		let current = this.state[from][key];
		let x = {...this.state};
		let y = x[to];
		y.push(current);
		
		let z = x[from];
		
		z.splice(key, 1);
		let saveObj = {};
		saveObj[to] = y;
		saveObj[from] = z;
		
		this.setState(saveObj, () => {
			this.saveDataLocally();						
		});
	}
	
	getData(colnumber, e) {
		e.preventDefault();
		let x = prompt('Add text for the card');
		let st = {...this.state};
		let colData = st[colnumber];
		colData.push(x);
		let obj = {};
		obj[colnumber] = colData;
		this.setState(obj, () => {
			this.saveDataLocally();						
		})
	}

  render() {
	  console.log('this.state: ', this.state);
    return (
      <div className="container2">
      	<div className="row">
			<div className="col-md-3 col-xs-3 col-sm-3 col-lg-3 col1">
				<div className="header">
					Winnie
				</div>
				<div>
					{
						this.state[0].length > 0 &&
							this.state[0].map((value, key) => {
								return 	<div key={key}>
											{value}
											<a href="" onClick={this.move.bind(this, key, 1, 0)}>R</a>
										</div>				 
							})
					}
				</div>
				<div>
				<a href="" onClick={this.getData.bind(this, 0)}>Add a card</a>
				</div>
			</div>
			<div className="col-md-3 col-xs-3 col-sm-3 col-lg-3 col2">
				<div className="header">
					header2
				</div>
				<div>
					{
						this.state[1].length > 0 &&
							this.state[1].map((value, key) => {
								
								return 	<div key={key}>
											<a href="" onClick={this.move.bind(this, key, 0, 1)}>L</a>
											{value}
											<a href="" onClick={this.move.bind(this, key, 2, 1)}>R</a>
										</div>				 
							})
					}
				</div>
				<div>
				<a href="" onClick={this.getData.bind(this, 1)}>Add a card</a>
				</div>
			
			</div>
			<div className="col-md-3 col-xs-3 col-sm-3 col-lg-3 col3">
				<div className="header">
					header3
				</div>
				<div>
					{
						this.state[2].length > 0 &&
							this.state[2].map((value, key) => {
								return 	<div key={key}>
											<a href="" onClick={this.move.bind(this, key, 1, 2)}>L</a>
											{value}
											<a href="" onClick={this.move.bind(this, key, 3, 2)}>R</a>
										</div>				 
							})
					}
				</div>
				<div>
				<a href="" onClick={this.getData.bind(this, 2)}>Add a card</a>
				</div>
			
			</div>
			<div className="col-md-3 col-xs-3 col-sm-3 col-lg-3 col4">
				<div className="header">
					header 4
				</div>
				<div>
					{
						this.state[3].length > 0 &&
							this.state[3].map((value, key) => {
								return 	<div key={key}>
											<a href="" onClick={this.move.bind(this, key, 2, 3)}>L</a>
											{value}
										</div>				 
							})
					}
				</div>
				<div>
				<a href="" onClick={this.getData.bind(this, 3)}>Add a card</a>
				</div>
			
			</div>
		</div>
      </div>
    );
  }
}

export default App;
