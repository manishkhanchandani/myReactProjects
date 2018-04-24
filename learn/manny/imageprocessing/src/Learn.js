import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getList, setImageAll, getUrlByFileNameSelf} from './AWS.js';
import {firebaseDatabase, FirebaseConstant} from './MyFirebase.js';
import Carousel from './Carousel.js';

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
			loader: -1
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
		
	fixStatus(props) {
		if (props.myReducer.learn === 'completed') {
			let str = localStorage.getItem('list');
			if (str) {
				let obj = JSON.parse(str);
				this.setState({list: obj, show: obj});
				for (let i = 0; i < obj.length; i++) {
					if (!this.props.myReducer.images[obj[i].Key]) {
						this.props.callGetImage(obj[i].Key);
					}
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
					}, 1000);																	  
				});		
				
			}// if started
		}
	}
	componentWillUnmount() {
		clearInterval(this.myVar);
	}

	render() {
		const mapPending = [0,1,2,3,4,5,6,7,8,9,10,11,12];
		return (
			<div className="my-container learn fade-in">
				<div className="row heading text-center">
					<div className="col-md-12">
						Learning & Analysing Images
					</div>
				</div>
				<div className="row second-row text-center">

						{
							this.props.myReducer.learn === 'pending' && 
							<span className="sub-details">No Image Uploaded</span>	
						}
						{
							this.props.myReducer.learn === 'started' && 
							<span className="sub-details"><span className="sub-header">image upload in progress</span><img src="/img/greenloaderBar2.gif" className="img-responsive " alt="loading1" /></span>
						}
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
							(this.state.list.length > 0 && this.props.myReducer.learn !== 'pending') &&
							<div>
							<Carousel items={this.state.list} name="items" loader={this.state.loader} show={this.state.show} images={this.props.myReducer.images} changeCurrent={this.changeCurrent.bind(this)} />
							{/*
							this.state.list.map((value, key) => {
								return <a className="bottom-column-item" key={key} href="" onClick={this.changeCurrent.bind(this, value)}>
									{
										(this.state.loader >= key && this.state.show[key] && this.props.myReducer.images[value.Key]) &&
										<img src={this.props.myReducer.images[value.Key]} alt={value.Key} className="img" />
									}
									{
										(this.state.loader + 1 === key) &&
										<img src="/img/circular_loader.gif" className="imgLoader" alt="loading1" />
									}
								</a>					 
							})*/
							}
							</div>
						}
						{
							((!this.props.myReducer.list && this.props.myReducer.learn === 'started') || this.props.myReducer.learn === 'pending') &&
							<div>
								<Carousel items={mapPending} name="items" loader={10000} show={this.state.show} images={this.props.myReducer.images} changeCurrent={this.changeCurrent.bind(this)} />
							{/*
							mapPending.map((value, key) => {
								return <a className="bottom-column-item" key={key} >
									
								</a>			 
							})*/
							}
							</div>
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