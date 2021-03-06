import React, {Component} from 'react';
import './Clock2.css';
import {connect} from 'react-redux';
import {changeStartTime} from '../essays/IssuesAction.js';
//https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

class Clock2 extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			seconds: 0,
			minutes: 0,
			hours: 0,
			days: 0,
			total: 0,
			daysSpan: '',
			hoursSpan: '',
			minutesSpan: '',
			secondsSpan: '',
			startTime: 0
		}
	}
	componentDidMount()
	{
		this.props.callChangeStartTime(parseInt(this.props.startTime, 10));
		var deadline = new Date(Date.parse(new Date()) + this.props.startTime * 1000);
		this.initializeClock(deadline);	
		/*
		this.setState({startTime: parseInt(this.props.startTime, 10)}, () => {
			var deadline = new Date(Date.parse(new Date()) + this.state.startTime * 1000);
			this.initializeClock(deadline);	
		});*/
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.startTime !== nextProps.issuesReducer.startTime) {
			clearInterval(this.timeinterval);
			nextProps.callChangeStartTime(parseInt(nextProps.startTime, 10));
			var deadline = new Date(Date.parse(new Date()) + nextProps.startTime * 1000);
			this.initializeClock(deadline);	
		}
		/*
		if (nextProps.startTime !== this.state.startTime && this.state.startTime > 0) {
			clearInterval(this.timeinterval);
			this.setState({startTime: parseInt(nextProps.startTime, 10)}, () => {
				var deadline = new Date(Date.parse(new Date()) + this.state.startTime * 1000);
				this.initializeClock(deadline);	
			});
		}*/
	}
	
	getTimeRemaining(endtime) {
	  var t = Date.parse(endtime) - Date.parse(new Date());
	  var seconds = Math.floor((t / 1000) % 60);
	  var minutes = Math.floor((t / 1000 / 60) % 60);
	  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	  var days = Math.floor(t / (1000 * 60 * 60 * 24));
	  this.setState({
			total: t,
			seconds: seconds,
			minutes: minutes,
			hours: hours,
			days: days
		});
	  return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	  };
	}
	
	initializeClock(endtime) {	
		var that = this;
	  function updateClock() {
		var t = that.getTimeRemaining(endtime);
		
		if (t.total <= 0) {
		  clearInterval(this.timeinterval);
		  return;
		}
		that.setState({
			daysSpan: t.days,
			hoursSpan: ('0' + t.hours).slice(-2),
			minutesSpan: ('0' + t.minutes).slice(-2),
			secondsSpan: ('0' + t.seconds).slice(-2)
		});
	
	  }
	
	  updateClock();
	  this.timeinterval = setInterval(updateClock, 1000);
	}
	
	render() {
		return (
			<div className="clock1">
				<div className="clockdiv">
					<div>
						<span className="days">{this.state.daysSpan}</span>
						<div className="smalltext">Days</div>
					</div>
					<div>
						<span className="hours">{this.state.hoursSpan}</span>
						<div className="smalltext">Hours</div>
					</div>
					<div>
						<span className="minutes">{this.state.minutesSpan}</span>
						<div className="smalltext">Minutes</div>
					</div>
					<div>
						<span className="seconds">{this.state.secondsSpan}</span>
						<div className="smalltext">Seconds</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		issuesReducer: state.IssuesReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callChangeStartTime: (val) => {
			dispatch(changeStartTime(val));
		}
	};	
};

export default connect(mapStateToProps, mapDispatchToProps)(Clock2);