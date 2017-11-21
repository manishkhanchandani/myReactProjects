import React, {Component} from 'react';


class RegularExpressionMatching extends Component {
	constructor(props) {
		super(props);
		//xa*b.c, xaabyc
		this.state = {
			values: 'x',
			pattern: 'x',
			result: ''	
		};
	}
	
	convert(e) {
		e.preventDefault();
		//logic goes here
		var str = this.state.values;
		var pat = this.state.pattern;
		if (!str) return;
		if (!pat) return;
		
		//string length:
		var sLen = str.length;
		//pattern length:
		var pLen = pat.length;
		
		var dp = [];
		
		//loop through string length + 1 and pattern length + 1 and create a false matrix
		for (let i = 0; i <= sLen; i++) {
			let tmp = [];
			for (let j = 0; j <= pLen; j++) {
				tmp.push(false);
			}
			
			dp.push(tmp);
		}
		//make first value as true
		dp[0][0] = true;
		
		console.log('dp is ', dp);
		
		//now lets go again one by one character of pattern and string
		for (let i = 0; i <= sLen; i++) {
			for (let j = 0; j <= pLen; j++) {
				console.log('i is ', i, ', j is ', j);
				console.log('string i - 1  is ', str[i - 1]);
				console.log('pattern j - 1  is ', pat[j - 1]);
				console.log('dp is ', dp);
				// 3 conditions to be tested
				if (pat[j - 1] !== '.' && pat[j - 1] !== '*') {
					console.log('in condition 1');
					if (i > 0 && pat[j-1] == str[i-1] && dp[i - 1][j - 1]) {
						console.log('i > 0 ', (i > 0), ', pat[j-1] == str[i-1] ', (pat[j-1] == str[i-1]), ', dp[i - 1][j - 1] ', (dp[i - 1][j - 1]));
						dp[i][j] = true;	
					}
					
				} else if (pat[j - 1] === '.') {
					console.log('in condition 2');
					if (i > 0 && dp[i-1][j-1]) {
						dp[i][j] = true;	
						
					}
					
				} else if (j > 1) {// '*' cannot be the first element
					console.log('in condition 3');
					if (dp[i][j-2]) { //0 occurance
						dp[i][j] = true;
					} else if (i > 0 && (pat[j-2] === str[i - 1] || pat[j - 2] === '.') && dp[i-1][j]) {
						console.log('i > 0 ', (i > 0), ', pat[j-2] === str[i - 1] ', (pat[j-2] === str[i - 1]), ', pat[j - 2] === . ', (pat[j - 2] === '.'), ', dp[i-1][j] ', (dp[i-1][j]));
						// example
						// xa and xa* 
						// s[i-1] === a
						// p[j-2] === a
						// a === a
						// so we can now compare x, xa*
						// and x here is dp[i-1][j]
						dp[i][j] = true;
					}
					
				}
			}
		}
		//set result
		console.log(dp);
		this.setState({result: dp[sLen][pLen]});
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<h3>Regular Expression Matching</h3>
				<div className="form-group">
					<label>Enter String</label>
					<input type="text" value={this.state.values} className="form-control" placeholder="Enter String" onChange={(e) => this.setState({values: e.target.value})} /><br />
					<label>Enter Pattern</label>
					<input type="text" value={this.state.pattern} className="form-control" placeholder="Enter Pattern" onChange={(e) => this.setState({pattern: e.target.value})} /><br />
					<a href="" onClick={this.convert.bind(this)} className="btn btn-primary form-control">Submit</a>
				  </div>
				  <h3>Result is {this.state.result} </h3>
				  <hr />
				  <p>https://www.youtube.com/watch?v=l3hda49XcDE#t=211.113333
<br /><br />
Implement regular expression matching with support for '.' and '*'.
<br /><br />
'.' Matches any single character.
<br />
'*' Matches zero or more of the preceding element.
<br />
The matching should cover the entire input string (not partial).
<br /><br />
The function prototype should be:
<br />
bool isMatch(const char *s, const char *p)

Some examples:
<br />isMatch("aa","a") = false
<br /> isMatch("aa","aa") = true
<br /> isMatch("aaa","aa") =false
<br /> isMatch("aa", "a*") = true
<br /> isMatch("aa", ".*") = true
<br /> isMatch("ab", ".*")= true
<br /> isMatch("aab", "c*a*b") = true</p>
				  <p><iframe width="560" height="315" title="video" src="https://www.youtube.com/embed/l3hda49XcDE" frameborder="0" gesture="media" allowfullscreen></iframe></p>
			</div>
		);
	}
}

export default RegularExpressionMatching;