import React, {Component} from 'react';


class Loader extends Component {
	render() {
		let loadingIcon = './loading.gif';
		return (
			<img src='/img/loading.gif' alt="loading ..." />
		);
	}
}

export default Loader;