import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from '../../MyFirebase.js';
import {Alert} from 'react-bootstrap';
import {getUID} from '../../utilities/functions.js';
import Dropzone from 'react-dropzone';
import FileUploadProgress  from 'react-fileupload-progress';

const styles = {
  progressWrapper: {
    height: '50px',
    marginTop: '10px',
    width: '400px',
    float:'left',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    WebkitBoxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)'
  },
  progressBar: {
    float: 'left',
    width: '0',
    height: '100%',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#5cb85c',
    WebkitBoxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    WebkitTransition: 'width .6s ease',
    Otransition: 'width .6s ease',
    transition: 'width .6s ease'
  },
  cancelButton: {
    marginTop: '5px',
    WebkitAppearance: 'none',
    padding: 0,
    cursor: 'pointer',
    background: '0 0',
    border: 0,
    float: 'left',
    fontSize: '21px',
    fontWeight: 700,
    lineHeight: 1,
    color: '#000',
    textShadow: '0 1px 0 #fff',
    filter: 'alpha(opacity=20)',
    opacity: '.2'
  },

  bslabel: {
    display: 'inline-block',
    maxWidth: '100%',
    marginBottom: '5px',
    fontWeight: 700
  },

  bsHelp: {
    display: 'block',
    marginTop: '5px',
    marginBottom: '10px',
    color: '#737373'
  },

  bsButton: {
    padding: '1px 5px',
    fontSize: '12px',
    lineHeight: '1.5',
    borderRadius: '3px',
    color: '#fff',
    backgroundColor: '#337ab7',
    borderColor: '#2e6da4',
    display: 'inline-block',
    padding: '6px 12px',
    marginBottom: 0,
    fontWeight: 400,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    touchAction: 'manipulation',
    cursor: 'pointer',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    backgroundImage: 'none',
    border: '1px solid transparent'
  }
};
//https://github.com/georgeOsdDev/react-fileupload-progress/blob/master/example/app.js
class CityManagerNew extends Component {
	constructor(props) {
		super(props);	
		
		this.state = {
			uid: '',
			name: '',
			description: '',
			tags: '',
			imageUrl: '',
			location: {},
			error: null,
			files: []
		};
	}
	
	formGetter(){
		return new FormData(document.getElementById('customForm'));
	}
	
	customFormRenderer(onSubmit){
		return (
		  <form id='customForm' style={{marginBottom: '15px'}}>
			<label style={styles.bslabel} htmlFor="exampleInputFile">File input</label>
			<input style={{display: 'block'}} type="file" name='file' id="exampleInputFile" />
			<p style={styles.bsHelp}>This is custom form.</p>
			<input type="text" name="title" id="title" /><br /><br />
			<input type="text" name="name" id="name" /><br /><br />
			<button type="button" style={styles.bsButton} onClick={onSubmit}>Upload</button>
		  </form>
		);
	}
	
	onDrop(acceptedFiles, rejectedFiles) {
	  // do stuff with files...
	  console.log('acceptedFiles: ', acceptedFiles);
	  console.log('rejectedFiles: ', rejectedFiles);
	  this.setState({files: acceptedFiles});
	}
	
	componentDidMount() {
		var uid = getUID();
		if (!uid) {
			//this.props.history.push("/");	
		}
		
		this.setState({uid: uid});
	}
	
	submitToFirebase() {
		
	}

	render() {
		console.log('state is ', this.state);
		return (
			<div className="container city-manager-new">
				<h1>Become City Manager</h1>
				<div className="row">
					<div className="col-md-12">
						{
							this.state.error &&
							<Alert bsStyle="warning">
								{this.state.error}
							</Alert>
						}
						<form onSubmit={this.submitToFirebase.bind(this)} ref="form">
						  <div className="form-group">
							<label>Name *</label>
							<input type="text" value={this.state.name} className="form-control" placeholder="Enter Name" onChange={(e) => {
								this.setState({name: e.target.value});	
							}} />
						  </div>
						  <label>City * (You want to become manager of which city, this should be city where you live or work in)</label>
						  <Autocomplete className="form-control addressBox" onPlaceSelected={(place) => {
							  
							  	if (!place.formatted_address) {
									alert('please choose the address');
									return null;
								}
								var componentForm = {
									locality: 'long_name',
									administrative_area_level_1: 'short_name',
									administrative_area_level_2: 'long_name',
									country: 'short_name',
								  };
								
								var obj = {};
								obj.formatted_address = place.formatted_address;
								obj.lat = place.geometry.location.lat();
								obj.lng = place.geometry.location.lng();
								
								for (var i = 0; i < place.address_components.length; i++) {
								  var addressType = place.address_components[i].types[0];
								  if (componentForm[addressType]) {
									var val = place.address_components[i][componentForm[addressType]];
									obj[addressType] = val;
								  }
								}
								
								this.setState({location: obj});
								
							}} types={['(cities)']} />
							
						  	<br />
							<div className="form-group mySpacing">
								<label>Describe Yourself *</label>
								<textarea rows="5" className="form-control" value={this.state.description} onChange={(e) => {
									this.setState({description: e.target.value});	
								}}></textarea>
							  </div>
							<section>
								<div className="dropzone">
									<Dropzone onDrop={this.onDrop.bind(this)}>
										<p>Try dropping some files here, or click to select files to upload.</p>
									</Dropzone>
								</div>
								<aside>
									<h2>Dropped files</h2>
									<ul>
									{
										this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
									}
									</ul>
								</aside>
							</section>
							<FileUploadProgress key='ex1' url='http://localhost/project2017/fileupload.php'
						  onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
						  onLoad={ (e, request) => {console.log('load', e, request);}}
						  onError={ (e, request) => {console.log('error', e, request);}}
						  onAbort={ (e, request) => {console.log('abort', e, request);}}
						  />
						  <br />
							<b>Note: </b> Your application will be in review and you will be notified in mail if you are selected or not.
						  <br />
						  <br />
						  <button type="submit" className="btn btn-primary form-control">Apply</button>
						  
						</form>
						
						<h3>Custome rederer</h3>

						<FileUploadProgress key='ex2' url='http://localhost/project2017/fileupload.php'
						  onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
						  onLoad={ (e, request) => {console.log('load', e, request);}}
						  onError={ (e, request) => {console.log('error', e, request);}}
						  onAbort={ (e, request) => {console.log('abort', e, request);}}
						  formGetter={this.formGetter.bind(this)}
						  formRenderer={this.customFormRenderer.bind(this)}
						  />
					</div>
				</div>
			</div>
		);
	}
}

export default CityManagerNew;