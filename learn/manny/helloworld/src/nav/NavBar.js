import React, { Component } from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';

class NavBar extends Component {
  
  render() {
    return (
      <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="container">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <Link to="/" className="navbar-brand">Home</Link>
              </div>
              <div className="collapse navbar-collapse">
                  <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                      <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More Details<span className="caret"></span></a>
                        <ul className="dropdown-menu">
                          <li><Link to="/">My Account</Link></li>
                          <li><Link to="/about">About</Link></li>
                          <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </li>
                  </ul>
                  <ul className="nav navbar-nav">
                      <li>
                          <a href="" className="dropdown-toggle" data-toggle="dropdown">Categories <b className="caret"></b></a>
                          <ul className="dropdown-menu">
                            <li className="dropdown-submenu">
                                    <a href="" className="dropdown-toggle" data-toggle="dropdown">Test A</a>
                                    <ul className="dropdown-menu">
                                      <li><Link to="/contact">Contact</Link></li>
                                      <li><Link to="/about">About</Link></li>
                                      <li><Link to="/">Home</Link></li>
                                    </ul>
                              </li>
                              <li className="dropdown-submenu">
                                    <a href="" className="dropdown-toggle" data-toggle="dropdown">Test B</a>
                                    <ul className="dropdown-menu">
                                      <li><Link to="/contact">Contact</Link></li>
                                      <li><Link to="/about">About</Link></li>
                                      <li><Link to="/">Home</Link></li>
                                    </ul>
                              </li>
                          </ul>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
    )
  }
}



export default NavBar;