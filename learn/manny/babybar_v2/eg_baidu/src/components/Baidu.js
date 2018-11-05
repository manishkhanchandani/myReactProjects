import React, {Component} from 'react';
import scriptCache from './script-cache.js';

class Baidu extends Component {
	constructor(props) {
		super(props);
		
		this.scriptCache = scriptCache({
		  baidu: 'http://api.map.baidu.com/api?v=2.0&ak=TRY2f6ZI5mSruC5WvCsXGqVSCfkHwG4I'
		});
		
		this.scriptCache.baidu.onLoad(() => {
			let BMap = window.BMap;
			var map = new BMap.Map("allmap");
			var point = new BMap.Point(-121.9854, 37.3501);
			console.log(point);
			map.centerAndZoom(point, 15);
			map.enableScrollWheelZoom(true);
			console.log(map);
		
			var marker = new BMap.Marker(new BMap.Point(-121.9854, 37.3501));
			console.log(marker);
			map.addOverlay(marker);
		})
	}

	render() {
		const MyStyle = {height: 500, width: 500};
		return (
			<div>
				Baidu
				<div id="allmap" style={MyStyle}></div>
			</div>
		);
	}
}

export default Baidu;