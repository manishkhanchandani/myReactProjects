import React, {Component} from 'react';
import { BaiduMap, asyncWrapper } from 'react-baidu-maps';

const AsyncMap = asyncWrapper(BaiduMap);
const MAP_KEY = 'TRY2f6ZI5mSruC5WvCsXGqVSCfkHwG4I';

class SMap extends Component {
	render() {
		return (
			<div style={{ background: '#444', height: '500px' }}>
				<AsyncMap
				  mapUrl={`http://api.map.baidu.com/api?v=2.0&ak=${MAP_KEY}`}
				  loadingElement={<div>Loading.....</div>}
				  mapContainer={<div style={{ height: '100%' }} />} />
			  </div>
		);
	}
}

export default SMap;