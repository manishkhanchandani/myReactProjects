import React, {Component} from 'react';
import NavMulti from '../Booking/nav-multi/NavMulti.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class BookingLayout extends Component {
    
	render() {
		return (
            <Router>
             <div>
                BookingLayout
                <NavMulti/>
                
                <Route exact={true} path="/" component={Home} />
				<Route exact={true} path="/create" component={Create} />
            
             </div>
            </Router>
		);
	}
}

export default BookingLayout;