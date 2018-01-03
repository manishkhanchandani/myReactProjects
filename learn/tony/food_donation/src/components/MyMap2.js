import React, {Component} from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
    />
  </GoogleMap>
));


class MyMap2 extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-6">
						MyMap2
					</div>
					<div className="col-md-6">
						<MapWithAMarker
						  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
						  loadingElement={<div style={{ height: `100%` }} />}
						  containerElement={<div style={{ height: `400px` }} />}
						  mapElement={<div style={{ height: `100%` }} />}
						/>
					</div>
				</div>
            </div>
		);
	}
}
export default MyMap2;