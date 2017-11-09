import React, { Component } from 'react';
import Sidebar from 'react-sidebar';

class App extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  sidebarOpen: false
		}
	
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	  }
   onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
  }
  
  
  render() {
	  console.log('state is ', this.state);
	  	var sidebarContent = <b>Sidebar content</b>;
    return (
      <div>
		<Sidebar sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               onSetOpen={this.onSetSidebarOpen}>
        	<b>Main content</b>
			<a href="" onClick={(e) => { e.preventDefault(); var val = !this.state.sidebarOpen; this.onSetSidebarOpen(val);}}>Open The Side Panel</a>
      	</Sidebar>
      </div>
    );
  }
}

export default App;
