import React, {Component} from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


class MapsBasicMap extends Component {
	render() {
		return (
			<GoogleMap
				defaultZoom={8}
				defaultCenter={{ lat: -34.397, lng: 150.644 }}
			  >
				{this.props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={this.props.onMarkerClick} />}
			  </GoogleMap>
		);
	}
}

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDnERUhALUFNxWZsjaLpT4_nqIYW2i2jDU&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(MapsBasicMap);