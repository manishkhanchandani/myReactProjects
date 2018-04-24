import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getList, setImageAll, getUrlByFileNameSelf} from './AWS.js';
import {firebaseDatabase, FirebaseConstant} from './MyFirebase.js';

class Learn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStatus: null,
			list: [],
			show: [],
			tmpList: [],
			current: null,
			counter: 0,
			loader: 0
		};
		
		this.myVar = '';
	}
	
	componentWillMount() {
		//var url = FirebaseConstant.basePath;
		//var ref = firebaseDatabase.ref(url).child('learn').set('pending');
	}
	
	changeCurrent(val, e) {
		e.preventDefault();
		
		this.setState({current: val});
	}
	
	
	getPictureUrl(props) {
		if (props.myReducer.learn === 'completed') {
			console.log('status is completed');
			return;
		}
		console.log('loader: ', this.state.loader);
		console.log('len: ', props.myReducer.list.length);
		if (!props.myReducer.list) {
			return;
		}
		
		if (props.myReducer.list.length === this.state.loader) {
			console.log('done');
			clearInterval(this.myVar);
			var url = FirebaseConstant.basePath;
			firebaseDatabase.ref(url).child('learn').set('completed');
			localStorage.setItem('list', JSON.stringify(props.myReducer.list));
			return;	
		}
		let data = props.myReducer.list[this.state.loader];
		console.log('data', data);
		if (data) {
			if (props.myReducer.images[data.Key]) {
				this.setState({loader: this.state.loader + 1});
			} else {
				console.log('hi');
			}
		}
	}
	
	fixStatus(props) {
		if (props.myReducer.learn === 'completed') {
			let str = localStorage.getItem('list');
			if (str) {
				let obj = JSON.parse(str);
				this.setState({list: obj, show: obj});
				for (let i = 0; i < obj.length; i++) {
					console.log(obj[i]);
					this.props.callGetImage(obj[i].Key);	
				}
				this.setState({current: obj[obj.length - 1], loader: obj.length - 1});
			}
		}
	}
	
	componentDidMount() {
		if (this.props.myReducer.learn === 'completed') {
			this.setState({currentStatus: this.props.myReducer.learn});	
			this.fixStatus(this.props);
		}
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.myReducer.learn !== this.state.currentStatus) {
			this.setState({currentStatus: nextProps.myReducer.learn});	
			this.fixStatus(nextProps);
		}
		if (nextProps.myReducer.list && nextProps.myReducer.list.length > 0 && nextProps.myReducer.list.length !== this.state.list.length) {
			//console.log('next props: ', nextProps.myReducer.list);
			if (nextProps.myReducer.learn === 'completed') {
				this.setState({list: nextProps.myReducer.list, show: nextProps.myReducer.list});
			}
			if (nextProps.myReducer.learn === 'started') {
				this.setState({list: nextProps.myReducer.list, show: [], counter: 0}, () => {
					this.myVar = setInterval(() => {
						this.getPictureUrl(nextProps);
					}, 5000);
				});
				/*
				this.setState({list: nextProps.myReducer.list, show: [], counter: 0}, () => {
					this.myVar = setInterval(() => {
						//console.log('counter is ', this.state.counter);

						if (!this.state.list[this.state.counter]) {
							clearInterval(this.myVar);	
							var url = FirebaseConstant.basePath;
							firebaseDatabase.ref(url).child('learn').set('completed');
							localStorage.setItem('list', JSON.stringify(this.state.list));
							return;	
						}
						if (!this.state.list[this.state.counter].Key) return;
						this.setState({loader: this.state.counter});
						if (!nextProps.myReducer.images[this.state.list[this.state.counter].Key]) {
							return;	
						}
						//let list = JSON.parse(JSON.stringify(this.state.tmpList));
						let current = this.state.list[this.state.counter]; //list.shift();
						let xshow = this.state.show;
						xshow.push(current);
						this.setState({current: current, show: xshow, counter: this.state.counter + 1 });
					}, 5000);																	  
				});*/		
				
			}// if started
		}
	}
	componentWillUnmount() {
		clearInterval(this.myVar);
	}

	render() {
		const mapPending = [0,1,2,3,4,5,6];
		return (
			<div className="my-container learn fade-in">
				<div className="row heading text-center">
					<div className="col-md-12">
						Learning & Analysing Images
					</div>
				</div>
				<div className="row second-row text-center">
					<div className="col-md-12">
						
						{
							this.props.myReducer.learn === 'pending' && 
							<span>No Image Uploaded</span>	
						}
					</div>
				</div>
				<div className="row second-row text-center">
					<div className="col-md-12">
						{
							this.props.myReducer.learn === 'started' && 
							<span><span className="sub-header">image upload in progress</span><br /><img src="/img/greenloaderBar2.gif" className="img-responsive " alt="loading1" /></span>
						}
					</div>
				</div>
				{
					(this.props.myReducer.learn === 'started' || this.props.myReducer.learn === 'pending' || this.state.current) &&
						<div className="row middle-row">
							<div className="col-md-12  middle-column ">
								{
									(this.props.myReducer.learn === 'started' || (this.state.current && this.props.myReducer.learn !== 'pending')) &&
									<div className="">
									{
										(this.state.current && this.state.current.Key && this.props.myReducer.images[this.state.current.Key]) ?
										<img src={this.props.myReducer.images[this.state.current.Key]} alt={this.state.current.Key}  className="img-responsive" /> :
										<img src="/img/shutterstock_712068100.jpg" className="img-responsive" alt="loading1" />
									}
									</div>
								}
								{
									this.props.myReducer.learn === 'pending' && 
									<div className="">
										<img src="/img/shutterstock_712068100.jpg" className="img-responsive" alt="loading1" />
									</div>
								}
							</div>
						
						</div>
				}
				<div className="row bottom-row">
					<div className="col-md-12 bottom-column">
						{
							this.props.myReducer.list &&
							this.props.myReducer.list.map((value, key) => {
														   console.log('val is ', value);
								return <div className="bottom-column-item" key={key}>
									{
										(this.props.myReducer.learn === 'started' && this.state.loader === key && !this.props.myReducer.images[value]) && 
										<img src="/img/circular_loader.gif" className="imgLoader" alt="loading1" />
									}
									{
										(this.props.myReducer.search === 'started' && this.state.loader > key && this.props.myReducer.images_highres[value]) && 
										<img src={this.props.myReducer.images_highres[value]} alt={value} className="img" />
									}
									{
										(this.props.myReducer.search === 'completed' && this.props.myReducer.images_highres[value]) && 
										<img src={this.props.myReducer.images_highres[value]} alt={value} className="img" />
									}
								</div>					 
							})
						}
						{
							(this.state.list.length > 0 && this.props.myReducer.learn !== 'pending') &&
							this.state.list.map((value, key) => {
								return <a className="bottom-column-item" key={key} href="" onClick={this.changeCurrent.bind(this, value)}>
									{
										(this.state.loader >= key && this.state.show[key] && this.props.myReducer.images[value.Key]) &&
										<img src={this.props.myReducer.images[value.Key]} alt={value.Key} className="img" />
									}
									{
										(this.state.loader === key && !this.props.myReducer.images[value.Key]) &&
										<img src="/img/circular_loader.gif" className="imgLoader" alt="loading1" />
									}
								</a>					 
							})
						}
						{
							((!this.props.myReducer.list && this.props.myReducer.learn === 'started') || this.props.myReducer.learn === 'pending') &&
							mapPending.map((value, key) => {
								return <a className="bottom-column-item" key={key} >
									
								</a>			 
							})
						}
					</div>
				
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myReducer: state.MyReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callGetList: () => {
			dispatch(getList(dispatch));	
		},
		callSetImageAll: (images) => {
			dispatch(setImageAll(images));	
		},
		callGetImage: (fn) => {
			dispatch(getUrlByFileNameSelf(fn));	
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(Learn);