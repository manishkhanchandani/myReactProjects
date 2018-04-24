import React, {Component} from 'react';
import Gauge from "svg-gauge";
import './SvgGuage.css';

const defaultOptions = {
  min: 0,
  max: 16,
  value: 11,
  animDuration: 1
};

class SvgGuage extends Component {
	componentDidMount() {
		this.renderGauge(this.props);
  	}

	shouldComponentUpdate(nextProps, nextState) {
		const {props} = this;
		if(props.value !== nextProps.value) {
		  this.renderGauge(nextProps);
		}
		return false;
	}

	renderGauge(props) {
		const gaugeOptions = Object.assign({}, defaultOptions, props);
		console.log('gaugeOptions: ', gaugeOptions);
		if(!this.gauge) {
		  this.gauge = Gauge(this.gaugeEl, gaugeOptions);
		}
		this.gauge.setValueAnimated(props.value, gaugeOptions.animDuration);
	}
  
	render() {
		let className = 'wrapper';
		return (
			<div className={className}>
				{/*<Gauge value={11} width={200} height={160} label="Memory Usage" min={0} max={16} color ="#F06677" backgroundColor="#D1D1D1" topLabelStyle={{fill: "#000"}} valueLabelStyle={{fill: "#000"}} minMaxLabelStyle={{fill: "black", fontSize: "24px"}} />*/}
				<div className="gauge-container" ref={el => this.gaugeEl = el}></div>
			</div>
		);
	}
}

export default SvgGuage;