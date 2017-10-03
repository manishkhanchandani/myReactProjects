import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Chat from './components/Chat';
import Create from './components/Create';
import Delete from './components/Delete';
import Edit from './components/Edit';
import Home from './components/Home';
import MyAcc from './components/MyAcc';

class App extends Component {
  render() {
    return (
			
			<Router>
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
				  <a className="navbar-brand" href="#">Project name</a>
				</div>
				<div id="navbar" className="navbar-collapse collapse">
				  <ul className="nav navbar-nav">
					<li className="active"><a href="#">Home</a></li>
					<li><a href="#about">About</a></li>
					<li><a href="#contact">Contact</a></li>
					<li className="dropdown">
					  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
					  <ul className="dropdown-menu">
						<li><a href="#">Action</a></li>
						<li><a href="#">Another action</a></li>
						<li><a href="#">Something else here</a></li>
						<li role="separator" className="divider"></li>
						<li className="dropdown-header">Nav header</li>
						<li><a href="#">Separated link</a></li>
						<li><a href="#">One more separated link</a></li>
					  </ul>
					</li>
				  </ul>
				  <ul className="nav navbar-nav navbar-right">
					<li><a href="../navbar/">Default</a></li>
					<li className="active"><a href="./">Static top <span className="sr-only">(current)</span></a></li>
					<li><a href="../navbar-fixed-top/">Fixed top</a></li>
				  </ul>
				</div>
			  </div>
			</nav>
			
			    <Route exact={true} path="/" component={Home} />
				<Route exact={true} path="/create" component={Create} />
				<Route exact={true} path="/myaccount" component={MyAcc} />
				<Route exact={true} path="/chat" component={Chat} />
				
				<Route exact={true} path="/edit/:id" component={Edit} />
				<Route exact={true} path="/delete/:id" component={Delete} />
			
			
			</div>
			</Router>
    
    );
  }
}

export default App;
