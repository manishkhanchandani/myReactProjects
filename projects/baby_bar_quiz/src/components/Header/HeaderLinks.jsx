import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionGoogleLogin, actionSignOut} from '../../actions/MyAction.js';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';


class HeaderLinks extends Component{
	
	googleLogin(e) {
		e.preventDefault();
		this.props.func1();
	}

	signOut(e) {
		e.preventDefault();
		this.props.func2();
	}
	
    render(){
        const notification = (
            <div>
                <i className="fa fa-globe"></i>
                <b className="caret"></b>
                <span className="notification">5</span>
                <p className="hidden-lg hidden-md">Notification</p>
            </div>
        );
        return (
            <div>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        <i className="fa fa-dashboard"></i>
                        <p className="hidden-lg hidden-md">Dashboard</p>
                    </NavItem>
                    <NavDropdown eventKey={2} title={notification} noCaret id="basic-nav-dropdown">
                        <MenuItem eventKey={2.1}>Notification 1</MenuItem>
                        <MenuItem eventKey={2.2}>Notification 2</MenuItem>
                        <MenuItem eventKey={2.3}>Notification 3</MenuItem>
                        <MenuItem eventKey={2.4}>Notification 4</MenuItem>
                        <MenuItem eventKey={2.5}>Another notifications</MenuItem>
                    </NavDropdown>
                    <NavItem eventKey={3} href="#">
                        <i className="fa fa-search"></i>
                        <p className="hidden-lg hidden-md">Search</p>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">Account</NavItem>
                    <NavDropdown eventKey={2} title="Dropdown" id="basic-nav-dropdown-right">
                        <MenuItem eventKey={2.1}>Action</MenuItem>
                        <MenuItem eventKey={2.2}>Another action</MenuItem>
                        <MenuItem eventKey={2.3}>Something</MenuItem>
                        <MenuItem eventKey={2.4}>Another action</MenuItem>
                        <MenuItem eventKey={2.5}>Something</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={2.5}>Separated link</MenuItem>
                    </NavDropdown>
                    <NavItem eventKey={3} href="" onClick={this.signOut.bind(this)}>Log out</NavItem>
                </Nav>
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
		func1: () => {
			dispatch(actionGoogleLogin());
		},
		func2: () => {
			dispatch(actionSignOut());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLinks);