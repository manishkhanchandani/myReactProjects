import React, { Component } from 'react';

class A16_Panels extends Component {
  render() {
    return (
		<div>       
		<div className="page-header">
        <h1>Panels</h1>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Panel title</h3>
            </div>
            <div className="panel-body">
              Panel content
            </div>
          </div>
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">Panel title</h3>
            </div>
            <div className="panel-body">
              Panel content
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">Panel title</h3>
            </div>
            <div className="panel-body">
              Panel content
            </div>
          </div>
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">Panel title</h3>
            </div>
            <div className="panel-body">
              Panel content
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Panel title</h3>
            </div>
            <div className="panel-body">
              Panel content
            </div>
          </div>
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h3 className="panel-title">Panel title</h3>
            </div>
            <div className="panel-body">
              Panel content
            </div>
          </div>
        </div>
      </div>
		</div>
    );
  }
}

export default A16_Panels;
