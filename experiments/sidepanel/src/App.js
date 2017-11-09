import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from './material_title_panel';
import SidebarContent from './sidebar_content';

import './App.css';

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
  content: {
    padding: '16px',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      docked: true,
      open: true,
	  pullRight: true
    };

    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
  }



  onSetOpen(open) {
    this.setState({open: open});
  }


  toggleOpen(ev) {
    this.setState({open: !this.state.open});

    if (ev) {
      ev.preventDefault();
    }
  }

  render() {
    const sidebar = <SidebarContent />;

    const contentHeader = (
      <span>
        {!this.state.docked &&
         <a onClick={this.toggleOpen.bind(this)} href="#" style={styles.contentHeaderMenuLink}>=</a>}
        <span> Responsive React Sidebar</span>
      </span>);

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
	  rootClassName: 'rootClass',
	  sidebarClassName: 'sideClass',
	  contentClassName: 'contentClass',
	  overlayClassName: 'overlayClass',
	  pullRight: this.state.pullRight
    };
console.log(this.state);
console.log(sidebarProps);
    return (
      <Sidebar {...sidebarProps}>
        <MaterialTitlePanel title={contentHeader}>
          <div style={styles.content}>
            <p>
              This example will automatically dock the sidebar if the page
              width is above 800px (which is currently {'' + this.state.docked}).
            </p>
            <p>
              This functionality should live in the component that renders the sidebar.
              This way you re able to modify the sidebar and main content based on the
              responsiveness data. For example, the menu button in the header of the
              content is now {this.state.docked ? 'hidden' : 'shown'} because the sidebar
              is {!this.state.docked && 'not'} visible.
            </p>
			<p><input type="checkbox" name="open" value={this.state.open} onChange={(e) => {this.setState({open: e.target.checked, docked: e.target.checked });}} /><label >Open</label></p>
			<p><input type="checkbox" name="pullRight" value={this.state.pullRight} onChange={(e) => {this.setState({pullRight: e.target.checked });}} /><label >pullRight</label></p>
			<p><a onClick={this.toggleOpen.bind(this)} href="#">=</a></p>
          </div>
        </MaterialTitlePanel>
      </Sidebar>
    );
  }
}

export default App;
