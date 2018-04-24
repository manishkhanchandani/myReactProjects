import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import JustGage from 'justgage';

class Gauge extends Component {
	componentDidMount() {
		this.node = ReactDOM.findDOMNode( this );
		
		this.guage = new JustGage({
		  id: "guage",
		  value: parseInt( this.props.value, 10 ),
		  min: parseInt( this.props.min, 10 ),
		  max: parseInt( this.props.max, 10 ),
		  title: this.props.title,
		  label: this.props.label
		});
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.value !== this.props.value ) {
			this.guage.refresh( nextProps.value );      
		}
		if ( nextProps.max !== this.props.max ) {
			this.guage.refresh( this.props.value, nextProps.max );      
		}
	}
	
	componentWillUnmount() {
		 ReactDOM.unmountComponentAtNode( this.node );
	}

	render() {
		return (
			<div>
				<div id="guage" />
			</div>
		);
	}
}


class JustMyGage extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: 550,
			max: 980
		}
	}
	
	handleUp() {
		this.setState({ value: this.state.value + 100 });
	}
	handleDown() {
		this.setState({ value: this.state.value - 100 });
	}
	
	handleUpMax() {
		this.setState({ max: this.state.max + 100 });
	}
	
	handleDownMax() {
		this.setState({ max: this.state.max - 100 });
	}
  
  
	render() {
		console.log('hey');
		let className = 'just-guage';
		return (
			<div className={className}>
				<h1>Gauge</h1>
				<Gauge value={ this.state.value } min="350" max={ this.state.max } title="" label="connections" id="1" />
				<button onClick={ this.handleUp }>Up Value</button>
				<button onClick={ this.handleDown }>Down Value</button>
				<button onClick={ this.handleUpMax }>Up Max</button>
				<button onClick={ this.handleDownMax }>Down Max</button>
			</div>
		);
	}
}

export default JustMyGage;