import React, {Component} from 'react';

class A13Alerts extends Component {
	render() {
		return (
			<div>
               
            <div className="page-header">
        <h1>Alerts</h1>
      </div>
      <div className="alert alert-success" role="alert">
        <strong>Well done!</strong> You successfully read this important alert message.
      </div>
      <div className="alert alert-info" role="alert">
        <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
      </div>
      <div className="alert alert-warning" role="alert">
        <strong>Warning!</strong> Best check yo self, you're not looking too good.
      </div>
      <div className="alert alert-danger" role="alert">
        <strong>Oh snap!</strong> Change a few things up and try submitting again.
      </div>

            
            </div>
		);	
	}
}

export default A13Alerts;