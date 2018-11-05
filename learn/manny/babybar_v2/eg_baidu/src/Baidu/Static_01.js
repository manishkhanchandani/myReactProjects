import React, {Component} from 'react';
import { BaiduMap } from 'react-baidu-maps';

class SMap extends Component {
	render() {
		return (
			<div style={{ background: '#444', height: '500px' }}>
				<BaiduMap mapContainer={<div style={{ height: '100%' }} />} />
			  </div>
		);
	}
}

export default SMap;