import React, {Component} from 'react';
import {utubeIDGrabber} from '../utilities/functions.js';
import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import {withRouter} from 'react-router';
import Select from 'react-select';
import '../common/react-select.css';



class VideosCategory extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			removeSelected: true,
			disabled: false,
			crazy: false,
			stayOpen: true,
			value: [],
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
						obj.subcat.push(subObject);
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
	}

	toggleCheckbox (e) {
		this.setState({
			[e.target.name]: e.target.checked,
		});
	}

	render() {
		console.log('video category props: ', this.props);
		console.log('video category is ', this.state);
		
		const { crazy, disabled, stayOpen, value } = this.state;
		return (
			<div className="section">
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
		);
	}
}

export default withRouter(VideosCategory);