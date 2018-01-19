import React, {Component} from 'react';
import {utubeIDGrabber} from '../utilities/functions.js';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import {withRouter} from 'react-router';
import Select from 'react-select';
import '../common/react-select/react-select.css';

class VideosCategory extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			removeSelected: true,
			disabled: false,
			crazy: false,
			stayOpen: true,
			value: [],
			realValues: {},
			categories: null,
			showCategories: null,
			rtl: false
		};
	}
	
	componentDidMount() {
		this.getCategories();	
	}
	
	getCategories() {
		let url = FirebaseConstant.basePath + '/list/' + this.props.match.params.list + '/categories';
		let ref = firebaseDatabase.ref(url);
		ref.once('value', (snapshot) => {
			if (!snapshot.exists()) {
				this.setState({categories: null});
				return;
			}
			let records = snapshot.val();
			let myArray = [];
			let showCategories = [];
			for (let k in records) {
				let obj = records[k];
				obj._id = k;
				
				showCategories.push({ label: obj.category, value: obj._id });
				if (obj.subcategories) {
					obj.subcat = [];
					for (let j in obj.subcategories) {
						let subObject = obj.subcategories[j];
						subObject._id = j;
						console.log('subObject: ', subObject);
						obj.subcat.push(subObject);
						showCategories.push({ label: '---- ' + subObject.subcategory, value: obj._id + '|' + subObject._id });
					}
				}
				myArray.push(obj);
			}
			
			console.log('showCategories: ', showCategories);

			this.setState({categories: myArray, showCategories: showCategories});
		});
	}
	
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
		let obj = this.state.realValues;
		if (!obj) obj = {};
		let tmp = value.split(',');
		if (!tmp) return;
		
		for (let i = 0; i < tmp.length; i++) {
			obj[tmp[i]] = true;	
		}
		
		this.props.chooseCategory(obj);
	}

	render() {
		
		const { crazy, disabled, stayOpen, value } = this.state;
		return (
			<div className="section">
				<div className="form-group">
					<label>Choose Category / SubCategory</label>
				{
					this.state.showCategories &&
					<Select
						closeOnSelect={!stayOpen}
						disabled={disabled}
						multi
						onChange={this.handleSelectChange.bind(this)}
						options={this.state.showCategories}
						placeholder="Select your category(ies)"
						removeSelected={this.state.removeSelected}
						rtl={this.state.rtl}
						simpleValue
						value={value}
					/>
				}
				</div>
			</div>
		);
	}
}

export default withRouter(VideosCategory);