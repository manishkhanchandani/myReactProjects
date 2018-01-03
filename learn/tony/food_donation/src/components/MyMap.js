import React, {Component} from 'react';

import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
class MyMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  showingInfoWindow: false,
		  activeMarker: {},
		  selectedPlace: {},
		}
		
		// binding this to event-handler functions
		this.onMarkerClick = this.onMarkerClick.bind(this);
		this.onMapClicked = this.onMapClicked.bind(this);
  }
  
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
 
  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }
	render() {
		var myStyle = {
			height: 300	
		};
		var pos = {
			lat: 40.8584405, 
			lng: -74.9956644
		};
		return (
			<div>
				<div className="row">
					<div className="col-md-4" style={myStyle}>
						<Map google={this.props.google}
							style={{width: '100%', height: '100%', position: 'relative'}}
							className={'map'}
							zoom={14}>
						  <Marker
							title={'The marker`s title will appear as a tooltip.'}
							name={'SOMA'}
							position={{lat: 37.778519, lng: -122.405640}} />
						  <Marker
							name={'Dolores park'}
							position={{lat: 37.759703, lng: -122.428093}} />
						  <Marker />
						  <Marker
							name={'Your position'}
							position={{lat: 37.762391, lng: -122.439192}}
							 />
							 <InfoWindow
						  marker={this.state.activeMarker}
						  visible={this.state.showingInfoWindow}>
							<div>
							  <h1>{this.state.selectedPlace.name}</h1>
							</div>
						</InfoWindow>
						</Map>
					</div>
					<div className="col-md-1">
					</div>
					
					<div className="col-md-7" style={myStyle}>
						<div id="map">
							<Map
								style={{width: '100%', height: '100%', position: 'relative'}}
								google={this.props.google}
								initialCenter={{
								  lat: 40.7484405,
								  lng: -73.9856644
								}}
								zoom={15}
								clickableIcons={false}
							>
								<Marker onClick={this.onMarkerClick}
									name={'Current location'}
									  title={'my title'}
								/>
							</Map>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDnERUhALUFNxWZsjaLpT4_nqIYW2i2jDU"
})(MyMap);