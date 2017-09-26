import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './Navigation.js';
import Home from './Home.js';
import About from './About.js';
import Login from './Login.js';
import NewPost from './NewPost.js';
import EditPost from './EditPost.js';
import MyAccount from './MyAccount.js';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Navigation />
        <div className="header">this is my header <hr /></div>
        
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/about" component={About} />
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/create" component={NewPost} />
        <Route exact={true} path="/edit/:id" component={EditPost} />
        <Route exact={true} path="/myaccount" component={MyAccount} />
        
        
        <div className="footer"><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><hr />this is my footer</div>
      </div>
      </Router>
    );
  }
}


export default App;
