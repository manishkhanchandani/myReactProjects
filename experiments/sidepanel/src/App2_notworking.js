import React, { Component } from 'react';
import Sidebar from 'react-sidebar';

const styles = {
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  sidebar: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
	padding: 50,
    transition: 'transform .3s ease-out',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    overflowY: 'auto',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
	padding: 50,
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    transition: 'left .3s ease-out, right .3s ease-out',
  },
  overlay: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity .3s ease-out, visibility .3s ease-out',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  dragHandle: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    bottom: 0,
  },
};
const mql = window.matchMedia(`(min-width: 800px)`);
class App extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  mql: mql,
		  sidebarDocked: props.docked,
		  sidebarOpen: props.sidebarOpen
		}
	
		this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    	this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	  }
   onSetSidebarOpen(open) {
	   console.log('open');
    this.setState({sidebarOpen: open});
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches});
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({sidebarDocked: this.state.mql.matches});
  }
  
  render() {
	  console.log('state is ', this.state);
	  	var sidebarContent = <b>Sidebar content</b>;
    var sidebarProps = {
      sidebar: this.state.sidebarOpen,
      docked: this.state.sidebarDocked,
      onSetOpen: this.onSetSidebarOpen
    };
	
	var children = (<div>Hello baby</div>);
	
    return (
      <div>
		<Sidebar sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               docked={this.state.sidebarDocked}
               onSetOpen={this.onSetSidebarOpen}
			   styles={styles}
			   >
        <b>Main content</b> 			<a href="" onClick={(e) => { e.preventDefault(); var val = !this.state.sidebarOpen; this.onSetSidebarOpen(val);}}>Toggle The Side Panel</a>

      </Sidebar>
      </div>
    );
  }
}

App.defaultProps = {
  sidebarDocked: false,
  sidebarOpen: false
}

export default App;
