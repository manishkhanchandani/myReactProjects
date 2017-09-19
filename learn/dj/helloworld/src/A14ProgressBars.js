import React, {Component} from 'react';

class A14ProgressBars extends Component {
	render() {
		return (
			<div>
               
            <div className="page-header">
                <h1>Progress bars</h1>
            </div>
            
            <p><b>Note DJ:</b> Commenting out the HTML as it was showing an error!</p>
            
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;"><span className="sr-only">60% Complete</span></div>
              </div>
              <div className="progress">
                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%"><span className="sr-only">40% Complete (success)</span></div>
              </div>
              <div className="progress">
                <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%"><span className="sr-only">20% Complete</span></div>
              </div>
              <div className="progress">
                <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"><span className="sr-only">60% Complete (warning)</span></div>
              </div>
              <div className="progress">
                <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%"><span className="sr-only">80% Complete (danger)</span></div>
              </div>
              <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"><span className="sr-only">60% Complete</span></div>
              </div>
              <div className="progress">
                <div className="progress-bar progress-bar-success" style="width: 35%"><span className="sr-only">35% Complete (success)</span></div>
                <div className="progress-bar progress-bar-warning" style="width: 20%"><span className="sr-only">20% Complete (warning)</span></div>
                <div className="progress-bar progress-bar-danger" style="width: 10%"><span className="sr-only">10% Complete (danger)</span></div>
              </div>
              



            
            </div>
		);	
	}
}

export default A14ProgressBars;