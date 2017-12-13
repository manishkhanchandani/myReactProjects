import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MapLayout from './components/map/Layout.js';


class App extends Component {
  render() {
    return (
      <Switch>
		  <Route path="/maps" component={MapLayout}/>
		</Switch>
    );
  }
}

export default App;
