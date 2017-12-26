import React, {Component} from 'react';
import './Clock1.css';
//https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

class Clock1 extends Component {
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
			secondsSpan: ''
		}
	}
	componentDidMount()
	{
		var deadline = new Date(Date.parse(new Date()) + 2 * 60 * 1000);
		this.initializeClock(deadline);	
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
		that.setState({
			daysSpan: t.days,
			hoursSpan: ('0' + t.hours).slice(-2),
			minutesSpan: ('0' + t.minutes).slice(-2),
			secondsSpan: ('0' + t.seconds).slice(-2)
		});
	
		if (t.total <= 0) {
		  clearInterval(timeinterval);
		}
	  }
	
	  updateClock();
	  var timeinterval = setInterval(updateClock, 1000);
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

export default Clock1;