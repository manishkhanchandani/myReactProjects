import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getList} from './AWS.js';
import {firebaseDatabase, FirebaseConstant} from './MyFirebase.js';

class Learn extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			list: [],
			show: [],
			tmpList: [],
			current: {}
		};
		
		this.myVar = '';
	}
	
	showList() {
		
		
	}
	
	componentWillMount() {
		var url = FirebaseConstant.basePath;
		var ref = firebaseDatabase.ref(url).child('learn').set('pending');
	}
	componentDidMount() {
		//this.props.callGetList();	
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.myReducer.list && nextProps.myReducer.list.length > 0 && nextProps.myReducer.list.length !== this.state.list.length) {
			//console.log('next props: ', nextProps.myReducer.list);
			if (nextProps.myReducer.learn === 'completed') {
				this.setState({list: nextProps.myReducer.list, show: nextProps.myReducer.list});
			}
			if (nextProps.myReducer.learn === 'started') {
				this.setState({list: nextProps.myReducer.list, show: [], tmpList: nextProps.myReducer.list}, () => {
					this.myVar = setInterval(() => {
						let list = JSON.parse(JSON.stringify(this.state.tmpList));
						let current = list.shift();
						//console.log('current is ', current);
						//this.props.callGetUrlByFileNameSelf(current.Key);
						//console.log('show list is ', this.state.show);	
						//console.log('tmpList list is ', this.state.tmpList);
						let xshow = this.state.show;
						xshow.push(current);
						this.setState({tmpList: list, current: current, show: xshow });
						if (list.length === 0) {
							clearInterval(this.myVar);	
							var url = FirebaseConstant.basePath;
							var ref = firebaseDatabase.ref(url).child('learn').set('completed');
						}
					}, 3000);																			  
				});
			}// if started
		}
	}
	componentWillUnmount() {
		clearInterval(this.myVar);
	}

	render() {
		
		return (
			<div className="my-container learn fade-in">
				<div className="row top-row">
					<div className="col-md-12">
						Learning & Analysing Images
					</div>
				</div>
				<div className="row second-row">
					<div className="col-md-12">
						No Image Uploaded
					</div>
				</div>
				<div className="row second-row">
					<div className="col-md-2">
						
					</div>
					<div className="col-md-2 heading">
						Learning Images
					</div>
					<div className="col-md-4 top-image ">
						{
							this.props.myReducer.learn === 'started' && 
							<span><img src="/img/loading7.gif" className="img-responsive " alt="loading1" /></span>	
						}
					</div>
					<div className="col-md-2 heading">
						<div className="pull-right">
							Analysing Images
						</div>
					</div>
					<div className="col-md-2">
						
					</div>
				</div>
				<div className="row middle-row">
					<div className="col-md-2">
						
					</div>
					<div className="col-md-8  middle-column">
						{
							this.props.myReducer.learn === 'started' &&
							<div className="thumbnail">
							{
								(this.state.current.Key && this.props.myReducer.images[this.state.current.Key]) ?
								<img src={this.props.myReducer.images[this.state.current.Key]} alt={this.state.current.Key} /> :
								<img src="/img/loading5.gif" className="img-responsive" alt="loading1" />
							}
							</div>
						}
						{
							this.props.myReducer.learn === 'pending' && 
							<div className="thumbnail1">
								<img src="/img/img_analyze_bg.png" className="img-responsive" alt="loading1" />
							</div>
						}
					</div>
					<div className="col-md-2">
						
					</div>
				
				</div>
				<div className="row bottom-row">
					<div className="col-md-12 bottom-column">
						{
							this.state.show.length > 0 &&
							this.state.show.map((value, key) => {
								return <div className="bottom-column-item thumbnail" key={key}>
									{
										this.props.myReducer.images[value.Key] ?
										<img src={this.props.myReducer.images[value.Key]} alt={value.Key} /> :
										<img src="/img/loading7.gif" className="img-responsive" alt="loading1" />
									}
								</div>					 
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
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(Learn);