import React, {Component} from 'react';

class A14ProgressBars extends Component {
	render() {
		return (
			<div>
               
            <div className="page-header">
        <h1>List groups</h1>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <ul className="list-group">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Morbi leo risus</li>
            <li className="list-group-item">Porta ac consectetur ac</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
        <div className="col-sm-4">
          <div className="list-group">
            <a href="#" className="list-group-item active">
              Cras justo odio
            </a>
            <a href="#" className="list-group-item">Dapibus ac facilisis in</a>
            <a href="#" className="list-group-item">Morbi leo risus</a>
            <a href="#" className="list-group-item">Porta ac consectetur ac</a>
            <a href="#" className="list-group-item">Vestibulum at eros</a>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="list-group">
            <a href="#" className="list-group-item active">
              <h4 className="list-group-item-heading">List group item heading</h4>
              <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            </a>
            <a href="#" className="list-group-item">
              <h4 className="list-group-item-heading">List group item heading</h4>
              <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            </a>
            <a href="#" className="list-group-item">
              <h4 className="list-group-item-heading">List group item heading</h4>
              <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            </a>
          </div>
        </div>
      </div>


            
            </div>
		);	
	}
}

export default A14ProgressBars;