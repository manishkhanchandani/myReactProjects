import React, {Component} from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import Create from './components/Create';
import Delete from './components/Delete';
import Edit from './components/Edit';
import Home from './components/Home';
import MyAcc from './components/MyAcc';
import Nav from './components/Nav';
import Confirm from './components/Confirm.js';
import ConfirmUpdate from './components/ConfirmUpdate.js';
import Chat from './modules/chat/Chat.js';
import Chat2 from './components/Chat2.js';    




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
				<Route exact={true} path="/chat/:toUserId" component={Chat} />
				
				<Route exact={true} path="/chat2" component={Chat2} />
				<Route exact={true} path="/chat2/:toUserId" component={Chat2} />
				
				
				<Route exact={true} path="/edit/:id" component={Edit} />
				<Route exact={true} path="/delete/:id" component={Delete} />
			    <Route exact={true} path="/confirm" component={Confirm} />
				 <Route exact={true} path="/confirm_update" component={ConfirmUpdate} />
				
				<Route exact={true} path="/search/:type/:keyword/:lat/:lng/:boundary/:addr/:country/:state/:county/:city" component={Home} />
				<Route exact={true} path="/search/:type/:keyword" component={Home} />
				<Route exact={true} path="/search/:type/:lat/:lng/:boundary/:addr/:country/:state/:county/:city" component={Home} />
				
				
				
				
				
				
				
				
			</div>
			</Router>
    
    );
  }
}

export default App;
