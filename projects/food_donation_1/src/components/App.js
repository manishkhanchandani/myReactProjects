import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './Navigation.js';
import Home from './Home.js';
import NewPost from './NewPost.js';
import EditPost from './EditPost.js';
import MyAccount from './MyAccount.js';
import Chat from './Chat/Chat.js';
import Details from './Details.js';
import Confirm from './Confirm.js';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Navigation />
        
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/confirm" component={Confirm} />
        <Route exact={true} path="/create" component={NewPost} />
        <Route exact={true} path="/edit/:id" component={EditPost} />
        <Route exact={true} path="/myaccount" component={MyAccount} />
        <Route exact={true} path="/chat" component={Chat} />
        <Route exact={true} path="/details/:id" component={Details} />
        
        
      </div>
      </Router>
    );
  }
}


export default App;
