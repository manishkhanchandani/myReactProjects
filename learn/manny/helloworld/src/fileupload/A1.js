import React, {Component} from 'react';

class A1 extends Component {
	render() {
    console.log('props: ', this.props.uploadedFile);
    return null;
		return (
			<div>
      {
        this.props.uploadedFile.map((value, key) => {
          return <div key={key}>hello</div>
        })
      }
      </div>
		);
	}
}

export default A1;
