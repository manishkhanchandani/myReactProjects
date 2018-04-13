import React, {Component} from 'react';
import Gauge from 'react-svg-gauge';
import './MyGuage.css';

class MyGuage extends Component {
	render() {
		let className = 'my-guage';
		return (
			<div className={className}>
				<Gauge value={11} width={400} height={320} label="Memory Usage" min={0} max={16} color ="#00965F" backgroundColor="#00ffff" topLabelStyle={{fill: "red"}} valueLabelStyle={{fill: "blue"}} minMaxLabelStyle={{fill: "black", fontSize: "16px"}} />
			</div>
		);
	}
}

export default MyGuage;