import React, {Component} from 'react';

// Given a sorted array, remove the duplicates in place such that each element appear only once and return the new length.

// Do not allocate extra space for another array, you must do this in place with constant memory.

// For example,
// Given input array nums = [1,1,2],

// Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively. It doesn't matter what you leave beyond the new length.

class RemoveDuplicateFromSortedArray extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			values: '1,1,2',
			result: ''	
		};
	}
	
	convert(e) {
		this.setState({values: e.target.value, result: false});
		var s = e.target.value;
		if (!s) return;
		console.log('s is ', s);
		
		var arr = s.split(',');
		for (let i = 0; i < arr.length; i++) {
			arr[i] = arr[i].trim();
		}
		console.log('arr is ', arr);
		
		var sorted = 0;
		for (let i = 0; i < arr.length; i++) {
			console.log('i is ', i);
			console.log('sorted is ', sorted);
			console.log('a is ',  arr[i]);
			console.log('arr[i] !== arr[sorted] ',  (arr[i] !== arr[sorted]));
			if (arr[i] !== arr[sorted]) {
				sorted++;
				arr[sorted] = arr[i];
				console.log('arr[i]',  arr[i]);
				console.log('arr[sorted]',  arr[sorted]);
			}
		}
		console.log('arr is ',  arr);
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<h3>Remove Duplicates From Sorted Array</h3>
				<div className="form-group">
					<label>Comma Separted Numbers</label>
					<input type="text" value={this.state.values} className="form-control" placeholder="Enter Values" onChange={this.convert.bind(this)} />
				  </div>
				  <h3>Result is {this.state.result} </h3>
			</div>
		);
	}
}

export default RemoveDuplicateFromSortedArray;