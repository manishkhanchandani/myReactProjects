import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {firebaseDatabase, FirebaseConstant} from '../MyFirebase.js';
import {defaultList, changeList, getListData} from './MyFlixAction.js';

import View1 from './views/View1.js';
import View2 from './views/View2.js';
import View3 from './views/View3.js';
import View4 from './views/View4.js';

class Home extends Component {
	constructor(props) {
		super(props);
		
		const list_id = this.props.match.params.list ? this.props.match.params.list : defaultList;
		this.state = {
			list_id: list_id
		};
	}
	
	componentDidMount() {
		this.props.callChangeList(this.state.list_id);
		this.props.callGetListData(this.state.list_id);
	}

	render() {
		let view = null;
		switch (this.props.match.params.viewTemplate) {
			case 'View1':
				view = (<View1 data={this.props.myFlixReducer.listData} list_id={this.state.list_id} />);
				break;
			case 'View2':
				view = (<View2 data={this.props.myFlixReducer.listData} list_id={this.state.list_id} />);
				break;
			case 'View3':
				view = (<View3 data={this.props.myFlixReducer.listData} list_id={this.state.list_id} />);
				break;
			case 'View4':
			default:
				view = (<View4 data={this.props.myFlixReducer.listData} list_id={this.state.list_id} />);
				break;
		}
		
		return (
			<div>
				{view}
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		myFlixReducer: state.MyFlixReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callChangeList: (newList) => {
			dispatch(changeList(newList));
		},
		callGetListData: (list_id) => {
			dispatch(getListData(list_id));	
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);