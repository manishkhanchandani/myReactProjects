import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as myActions from './MyAction.js';
import MyGuage from './MyGuage.js';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from './MyFirebase.js';
import './Effect.css';


class Monitor extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			logs: [],
			val: ''
		};
		
		//var url2 = FirebaseConstant.log2Path;
		//firebaseDatabase.ref(url2).set(null);
	}
	c1(e) {
		e.preventDefault();
		var url2 = FirebaseConstant.log2Path;
		let obj = {
			text: this.state.val, 
			current: firebase.database.ServerValue.TIMESTAMP
		};
		firebaseDatabase.ref(url2).push(obj);	
	}
	componentDidMount() {	
		this.props.callChangeTab('monitor');
		var url = FirebaseConstant.logPath;
		var ref = firebaseDatabase.ref(url);
		ref.on('value', (snapshot) => {
			var result = snapshot.val();
			if (this.props.myReducer.monitor_bandwidth !== result.bandwidth) {
				this.props.callSetBandwidth(result.bandwidth);				
			}
			if (this.props.myReducer.monitor_cpu !== result.cpu) {
				this.props.callSetCpu(result.cpu);				
			}
			if (this.props.myReducer.monitor_disk !== result.disk) {
				this.props.callSetDisk(result.disk);				
			}
			if (this.props.myReducer.monitor_memory !== result.memory) {
				this.props.callSetMemory(result.memory);				
			}
		});	
		var url2 = FirebaseConstant.log2Path;
		var ref2 = firebaseDatabase.ref(url2);
		ref2.on('value', (snapshot) => {
			var result = snapshot.val();
			if (!result) return;
			let arr = [];
			for (let i in result) {
				arr.push(result[i]);
			}
			this.setState({logs: arr});			
		});	
	}

	render() {
		const arr = this.state.logs;
		let arr2 = []
		if (arr.length > 0) {
			for (let i = 0; i < arr.length; i++) {
				arr2.push(<div key={i}>{arr[i].text}</div>);	
			}
		}
		return (
			<div className="my-container fade-in monitor">
				<div className="row">
					<div className="col-md-12">
					<h3>Usage</h3>
					</div>
				</div>
				<div className="row guage">
					<div className="col-md-3 text-center">
						<MyGuage label="Memory Usage" value={this.props.myReducer.monitor_memory}  min={0} max={16} symbol=" GB" />
					</div>
					<div className="col-md-3 text-center">
						<MyGuage label="Bandwidth Usage" value={this.props.myReducer.monitor_bandwidth}  min={0} max={100} symbol=" Mbps" />
					</div>
					<div className="col-md-3 text-center">
						<MyGuage label="Disk I/O Usage" value={this.props.myReducer.monitor_disk}  min={0} max={100} symbol=" Mbps" />
					</div>
					<div className="col-md-3 text-center">
						<MyGuage label="CPU Usage" value={this.props.myReducer.monitor_cpu}  min={0} max={100} symbol=" %" />
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
					<h3>Logs</h3>
					{/*<input type="text" value={this.state.val} onChange={(e) => {this.setState({val: e.target.value});}} />
					<a href="" onClick={this.c1.bind(this)}>Click</a>*/}
					<div className="logs">{arr2}</div>
						
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
		callChangeTab: (tab) => {
			dispatch(myActions.changeTab(tab));
		},
		callSetBandwidth: (num) => {
			dispatch(myActions.setBandwidth(num));
		},
		callSetCpu: (num) => {
			dispatch(myActions.setCpu(num));
		},
		callSetDisk: (num) => {
			dispatch(myActions.setDisk(num));
		},
		callSetMemory: (num) => {
			dispatch(myActions.setMemory(num));
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(Monitor);