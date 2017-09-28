import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class About extends Component {
    componentDidMount() {
        
    }
    mango() {
        this.props.history.push("/contact");
    }
	render() {
        console.log('about: ', this.props);
        
		return (
			<div>
				About
                <button onClick={this.mango.bind(this)}>Hello</button>
                <Redirect to="/" push={true} />
			</div>
		);
	}
}

export default About;