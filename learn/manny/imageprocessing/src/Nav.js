import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as myActions from './MyAction.js';
import {withRouter} from 'react-router';
import {firebaseDatabase, FirebaseConstant} from './MyFirebase.js';
import {getList, getOnlyList} from './AWS.js';

class Nav extends Component {
	componentDidMount() {
		const urls = {
			learn: '/learn',
			search: '/search',
			upload: '/upload',
			request: '/request',
			monitor: '/monitor'
		};
		var url = FirebaseConstant.basePath;
		var ref = firebaseDatabase.ref(url);
		ref.on('value', (snapshot) => {
			var result = snapshot.val();
			console.log('result is ', result);
			let learn = result.learn;
			if (this.props.myReducer.learn !== learn) {
				console.log('learn is ', learn);
				this.props.callChangeLearnStatus(learn);
			}
			
			if (!this.props.myReducer.list && learn === 'started') {
				this.props.callGetList();
			}
				
			
			let srch = result.search;
			if (this.props.myReducer.search !== srch) {
				console.log('srch is ', srch);
				this.props.callChangeSearchStatus(srch);
			}
			let tab = result.tab.current;
			if (this.props.myReducer.tab !== tab) {
				console.log('tab is ', tab);
				this.props.callChangeTab(tab);
				var tabUrl = (urls[tab]) ? urls[tab] : '/';
				this.props.history.push(tabUrl);
			}
		});		
	}
	
	clickTab(tab, e) {
		e.preventDefault();
		var url = FirebaseConstant.basePath;
		firebaseDatabase.ref(url).child('tab').child('current').set(tab);
	}
	
	resetFb(e) {
		e.preventDefault();
		var url = FirebaseConstant.basePath;
		firebaseDatabase.ref(url).child('tab').child('current').set('home');
		firebaseDatabase.ref(url).child('learn').set('pending');
		firebaseDatabase.ref(url).child('search').set('pending');
	}

	render() {
		const tab = this.props.myReducer.tab;

		let tabs = {
			learn: (tab === 'learn') ? 'active' : '',
			search: (tab === 'search') ? 'active' : '',
			upload: (tab === 'upload') ? 'active' : '',
			request: (tab === 'request') ? 'active' : '',
			monitor: (tab === 'monitor') ? 'active' : '',
		};
		return (
			<div>
				<nav className="navbar navbar-inverse navbar-static-top">
				  <div className="container">
					<div className="navbar-header">
					  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					  </button>
					  <a className="navbar-brand" href="" onClick={this.clickTab.bind(this, 'home')}><img src="/img/RSI_logo_white3x.png" className="img-responsive img-logo" alt="Processing" /></a>
					</div>
					<div id="navbar" className="collapse navbar-collapse">
					  <ul className="nav navbar-nav nav-left">
						<li className={tabs.learn}><a href="" onClick={this.clickTab.bind(this, 'learn')}>Learn</a></li>
						<li className={tabs.search}><a href="" onClick={this.clickTab.bind(this, 'search')}>Search</a></li>
						{/*<li className={tabs.upload}><a href="" onClick={this.clickTab.bind(this, 'upload')}>Upload</a></li>
						<li className={tabs.request}><a href="" onClick={this.clickTab.bind(this, 'request')}>Requests</a></li>*/}
						<li className={tabs.monitor}><a href="" onClick={this.clickTab.bind(this, 'monitor')}>Monitor</a></li>
					  </ul>
					  
					  <ul className="nav navbar-nav navbar-right">
						<li><a href="" onClick={this.resetFb.bind(this)}><img src="/img/poweredBy8K.png" className="img-responsive img-logo2" alt="8K Miles" /></a></li>
					  </ul>
					</div>
				  </div>
				</nav>		
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
		callChangeLearnStatus: (val) => {
			dispatch(myActions.changeLearnStatus(val));	
		},
		callChangeSearchStatus: (val) => {
			dispatch(myActions.changeSearchStatus(val));	
		},
		callGetList: () => {
			dispatch(getList(dispatch));	
		},
		callGetOnlyList: () => {
			dispatch(getOnlyList(dispatch));	
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));