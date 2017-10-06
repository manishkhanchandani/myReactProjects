import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Chat from './components/Chat';
import Create from './components/Create';
import Delete from './components/Delete';
import Edit from './components/Edit';
import Home from './components/Home';
import MyAcc from './components/MyAcc';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
			
			<Router>
			<div>
			
				<Nav />
			
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
