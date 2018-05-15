import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faPause from '@fortawesome/fontawesome-free-solid/faPause';
import faStop from '@fortawesome/fontawesome-free-solid/faStop';
import VoicePlayer from './VoicePlayer.js'

class Voice extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			play: false,
			pause: false
		};
	}
	playBtn() {
		return (<FontAwesomeIcon icon={faPlay}/>);	
	}
	pauseBtn() {
		return (<FontAwesomeIcon icon={faPause}/>);	
	}
	stopBtn() {
		return (<FontAwesomeIcon icon={faStop}/>);	
	}
	onEnd() {
		this.setState({ play: false });
	}
	render() {
		console.log('voice: ', this.state);
		return (
			<span>
				<button onClick={() => this.setState({ play: true, pause: false })}>{this.playBtn()}</button>
				<button onClick={() => this.setState({ pause: true })}>{this.pauseBtn()}</button>
				{this.state.play && (
				  <VoicePlayer
					play
					pause={this.state.pause}
					text={this.props.text}
					onEnd={this.onEnd}
				  />
				)}
			</span>
		);
	}
}

export default Voice;