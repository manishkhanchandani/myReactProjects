import React, {Component} from 'react';
import { BaiduMap, Marker, InfoWindow, NavigationControl, MapTypeControl, OverviewMapControl } from 'react-baidu-maps';

var map = new BMap.Map("allmap");
console.log('map is ', map);
class SMap extends Component {
	render() {
		return (
			<div style={{ background: '#444', height: '500px' }}>
				<BaiduMap
				  mapContainer={<div style={{ height: '100%' }}
				  onClick={(d) => {console.log('hey2', d);}} />}
				  defaultZoom={11}
				  mapStyle="midnight"
				  >
				  <Marker position={{ lng: 116.404, lat: 39.915 }}>
				  	<InfoWindow content="marker infoWindow" offset={{ width: 0, height: -20 }} />
				  </Marker>
				  <NavigationControl
					type="small"
					anchor="top_right"
					offset={{ width: 0, height: 30 }} />
				  </BaiduMap>
			  </div>
		);
	}
}

export default SMap;