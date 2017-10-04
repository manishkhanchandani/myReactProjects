import React, {Component} from 'react';



class Lable extends Component {
	constructor(props){
		super(props);
		this.state = {
			username:'Catherine'
			}
		}
	
	render() {
		return (
				<div>
				<label>My Lable <input type="text" default="{this.state.username}"></label>
				</div>

		);
	}
}

export default Lable;