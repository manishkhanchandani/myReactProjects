import React, {Component} from 'react';
import MapsBasicMap from './BasicMap.js';

class MapBasic extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			isMarkerShown: false
		};	
	}

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker() {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000);
  }

  handleMarkerClick(){
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  }
	render() {
		return (
			<div>
				<MapsBasicMap
					isMarkerShown={this.state.isMarkerShown}
					onMarkerClick={this.handleMarkerClick.bind(this)}
				  />
			</div>
		);
	}
}

export default MapBasic;