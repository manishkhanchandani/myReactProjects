import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux';
import * as myActions from './MyAction.js';
import {withRouter} from 'react-router';
//import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from './MyFirebase.js';

class Nav extends Component {
	componentDidMount() {
		const urls = {
			upload: '/upload',
			request: '/request',
			monitor: '/monitor'
		};
		var url = FirebaseConstant.basePath + '/tab/current';
		var ref = firebaseDatabase.ref(url);
		ref.on('value', (snapshot) => {
			var result = snapshot.val();
			this.props.callChangeTab(result);
			var tab = (urls[result]) ? urls[result] : '/';
			this.props.history.push(tab);
		});		
	}
	render() {
		const tab = this.props.myReducer.tab;

		let tabs = {
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
					  <Link className="navbar-brand" to="/"><img src="/img/RSI_logo_white3x.png" className="img-responsive img-logo" alt="Processing" /></Link>
					</div>
					<div id="navbar" className="collapse navbar-collapse">
					  <ul className="nav navbar-nav nav-left">
						<li className={tabs.upload}><Link to="/upload">Upload</Link></li>
						<li className={tabs.request}><Link to="/request">Requests</Link></li>
						<li className={tabs.monitor}><Link to="/monitor">Monitor</Link></li>
					  </ul>
					  
					  <ul className="nav navbar-nav navbar-right">
						<li><Link to="/"><img src="/img/poweredBy8K.png" className="img-responsive img-logo" alt="8K Miles" /></Link></li>
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
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));