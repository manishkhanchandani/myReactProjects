import React, {Component} from 'react';
import NavMulti from '../homrx/nav-multi/NavMulti.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {getUID} from '../utilities/functions.js';
import Home from './Home.js';
import Main from './Main.js';


class HomrxLayout extends Component {
    
	render() {
		const uid = getUID();
		if (!uid) {
			return (<Home />);
		}

		return (
            <Router>
             <div>
                <NavMulti/>
                
                <Route exact={true} path="/" component={Main} />
            
             </div>
            </Router>
		);
	}
}

export default HomrxLayout; 