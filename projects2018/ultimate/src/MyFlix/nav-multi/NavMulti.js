import React, {Component} from 'react';
import {connect} from 'react-redux';
import './NavMulti.css';
import {Link} from 'react-router-dom'; 
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {getUID} from '../../utilities/functions.js';
import Auth from '../../modules/auth/Auth.js';
import Themes from '../../Themes.js';
import {defaultList} from '../MyFlixAction.js';

class NavMulti extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			data: null,
			currentUID: null
		};
	}
	
	componentDidMount() {
		this.getData();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.authReducer.uid && nextProps.authReducer.uid !== this.state.currentUID) {
			this.getData();
		}
	}

	getData() {
		let uid = getUID();
		if (!uid) return;
		this.setState({currentUID: uid});
		let url = FirebaseConstant.basePath + '/list';
		let ref = firebaseDatabase.ref(url).orderByChild('user_id').equalTo(uid);
		ref.on('value', (snapshot) => {
			if (!snapshot.exists()) {
				this.setState({data: null});
				return;
			}
			let records = snapshot.val();
			let myArray = [];
			for (let k in records) {
				records[k]._id = k;
				myArray.push(records[k]);
			}

			this.setState({data: myArray});
		});
	}

	render() {
		let url = '';
		if (this.props.myFlixReducer.list) {
			if (this.props.myFlixReducer.list !== defaultList) {
				url = '/' + this.props.myFlixReducer.list;
			}
		}
		
		let userList = [];
		let userVideoList = [];
		let userCatList = [];
		if (this.state.data) {
			for (let i = 0; i < this.state.data.length; i++) {
				let viewListUrl2 = '/' + this.state.data[i]._id;
				let linkUrl2 = '/manage/' + this.state.data[i]._id + '/categories';
				let videoUrl2 = '/manage/' + this.state.data[i]._id + '/videos';
				if (defaultList === this.state.data[i]._id) {
					viewListUrl2 = '/';
				}
				userList.push(<li key={i}><a href={viewListUrl2}>{this.state.data[i].list}</a></li>);
				userVideoList.push(<li key={i}><Link to={videoUrl2}>{this.state.data[i].list}</Link></li>);	
				userCatList.push(<li key={i}><Link to={linkUrl2}>{this.state.data[i].list}</Link></li>);		
			}
		}
		
		return (
			<div className="nav-multi">
				<div className="navbar navbar-inverse navbar-static-top" role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to={`${url}`}>MyFlix</Link>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav navbar-right">
								{
									this.props.authReducer.uid && 
										<li>
											<a href="" className="dropdown-toggle" data-toggle="dropdown">Admin <b className="caret"></b></a>
											<ul className="dropdown-menu multi-level">
												<li><Link to="/create">Manage List</Link></li>
												<li className="dropdown-submenu">
													<a href="" className="dropdown-toggle" data-toggle="dropdown">List</a>
													<ul className="dropdown-menu">
														{userList}
													</ul>
												</li>
												<li className="dropdown-submenu">
													<a href="" className="dropdown-toggle" data-toggle="dropdown">Categories</a>
													<ul className="dropdown-menu">
														{userCatList}
													</ul>
												</li>
												<li className="dropdown-submenu">
													<a href="" className="dropdown-toggle" data-toggle="dropdown">Videos</a>
													<ul className="dropdown-menu">
														{userVideoList}
													</ul>
												</li>
												
												
											</ul>
										</li>
								}
								<Themes />
								<Auth />
							</ul>
							<ul className="nav navbar-nav">
								<li className="active"><Link to={`${url}`}>Home</Link></li>
								
								<li>
									<a href="" className="dropdown-toggle" data-toggle="dropdown">Views <b className="caret"></b></a>
									<ul className="dropdown-menu multi-level">
										
										<li><Link to={`${url}/view/View4`}>View 4</Link></li>
										<li><Link to={`${url}/view/View3`}>View 3</Link></li>
										<li><Link to={`${url}/view/View1`}>View 1</Link></li>
										<li><Link to={`${url}/view/View2`}>View 2</Link></li>
										
										
									</ul>
								</li>
								
								
								
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		myFlixReducer: state.MyFlixReducer,
		authReducer: state.AuthReducer
	}	
};

export default connect(mapStateToProps)(NavMulti);