import React, {Component} from 'react';

var c2n = function(c){
    switch(c){
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        case 'M': return 1000;
        default: return 0;
    }
}

class RomanToInteger extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			romanNumber: '',
			result: ''	
		};
	}
	
	convert(e) {
		var result = 0;
		this.setState({romanNumber: e.target.value, result: ''});
		var s = e.target.value;
		if (!s) return;
		console.log('result is ', result);
		for(var i = 0; i < s.length; i++){
			console.log('i is ', i, ' and val is ', s[i], ', converted amt is ', c2n(s[i]));	
			if(i > 0 && (c2n(s[i]) > c2n(s[i-1]))){
				console.log('i2 is ', i, ', c2n of i is ', c2n(s[i]), ', c2n of i - 1 is : ', c2n(s[i-1]));
				result -= 2*c2n(s[i-1]); // because previously added [!!!]
				console.log('result2 is ', result);
			}
			result += c2n(s[i]);
			console.log('result is ', result);
		}
		this.setState({result: result});
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<h3>Roman To Integer</h3>
				<div className="form-group">
					<label>Enter Roman Number</label>
					<input type="text" value={this.state.romanNumber} className="form-control" placeholder="Enter Roman Number" onChange={this.convert.bind(this)} />
				  </div>
				  <h3>Result is {this.state.result} </h3>
			</div>
		);
	}
}

export default RomanToInteger;