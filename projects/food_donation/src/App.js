import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 

import Nav from './components/Nav.js';
import Home from './components/Home.js';
import Create from './components/Create.js';
import Edit from './components/Edit.js';
import Delete from './components/Delete.js';
import MyAccount from './components/MyAccount.js';
import Confirm from './components/Confirm.js';
import Chat from './modules/chat/Chat.js';
import MyMap2 from './components/MyMap2.js';

class App extends Component {
  render() {
    return (
	  <Router>
      <div>
	  	<Nav />
	
			
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/create" component={Create} />
        <Route exact={true} path="/confirm" component={Confirm} />
        <Route exact={true} path="/edit/:id" component={Edit} />
        <Route exact={true} path="/delete/:id" component={Delete} />
        <Route exact={true} path="/myaccount" component={MyAccount} />
		
        <Route exact={true} path="/chat" component={Chat} />
        <Route exact={true} path="/chat/:toUserId" component={Chat} />
        <Route exact={true} path="/map" component={MyMap2} />
		
		<Route exact={true} path="/search/:type/:keyword/:lat/:lng/:boundary/:addr/:country/:state/:county/:city" component={Home} />
		<Route exact={true} path="/search/:type/:keyword" component={Home} />
		<Route exact={true} path="/search/:type/:lat/:lng/:boundary/:addr/:country/:state/:county/:city" component={Home} />
		
      </div>
	  </Router>
    );
  }
}

export default App;
