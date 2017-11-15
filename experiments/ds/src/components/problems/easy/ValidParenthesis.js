import React, {Component} from 'react';


class ValidParenthesis extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			values: '',
			result: ''	
		};
	}
	
	convert(e) {
		this.setState({values: e.target.value, result: false});
		var s = e.target.value;
		if (!s) return;
		var stack = [];
		var top;
		var str = 'invalid';
		var selfReturn = 'valid';
		
		for(let i = 0; i < s.length; i++) {
			console.log('i is ', i, ' and s is ', s[i]);

			var chr = s[i];//get each character
			if (chr === '{' || chr === '[' || chr === '(') {
				stack.push(chr);									
			} else if (chr === '}' || chr === ']' || chr === ')') {
				top = stack.pop();
				console.log('top is ', top);
				if (!top) {
					selfReturn = str;
					break;
				}
				
				if (top === '{' && chr !== '}' ) {
					selfReturn = str;
					break;
				}
				
				if (top === '[' && chr !== ']' ) {
					selfReturn = str;
					break;
				}
				
				if (top === '(' && chr !== ')' ) {
					selfReturn = str;
					break;
				}
			}
			
		}
		console.log('stack is ', stack);
		
		if (stack.length > 0) {
			selfReturn = str;	
		}

		this.setState({result: selfReturn});
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<h3>Valid Parenthesis</h3>
				<div className="form-group">
					<label>Enter Values like curly, round, rectangular brackets</label>
					<input type="text" value={this.state.values} className="form-control" placeholder="Enter String" onChange={this.convert.bind(this)} />
				  </div>
				  <h3>Result is {this.state.result} </h3>
			</div>
		);
	}
}

export default ValidParenthesis;