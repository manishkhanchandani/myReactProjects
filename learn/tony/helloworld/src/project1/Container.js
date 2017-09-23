import React, {Component} from 'react';
import Search from './Search.js';



class Container extends Component {
    render() {
        return (	
            <div className="container">
                <div className="row">
                    <div className="col-md-3"><Search/></div>
                    <div className="col-md-9"><h3>Col 2</h3></div>
                </div>          
            </div>
        );	
    }
}

export default Container;