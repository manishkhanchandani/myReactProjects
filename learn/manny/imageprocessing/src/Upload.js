import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as myActions from './MyAction.js';
import ReactS3 from 'react-s3';
 
const config = {
    bucketName: 'aws-rek-images',
    albumName: '',
    region: 'us-east-2',
    accessKeyId: 'AKIAJKY2QQLW2GFYVTQA',
    secretAccessKey: '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',
}

class Upload extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			fileName: '',
			files: []
		};
	}
	componentDidMount() {
		this.props.callChangeTab('upload');
	}
	
	selectFile(e) {
		let sfiles = this.state.files;
		var files = document.getElementById('photoupload').files;
		if( files && files.length >= 1 ) {
			for (let i = 0; i < files.length; i++) {
				console.log(files[i]);
				sfiles.push(files[i]);
			}
		}
		this.setState({files: sfiles});
	}
	
	submitFrm() {
		var files = this.state.files;
		console.log(files);
		if (!files.length) {
			return alert('Please choose a file to upload first.');
		}
		
		for (let i = 0; i < files.length; i++) {
			var file = files[0];
			console.log(file);
			ReactS3.upload(file, config)
			.then((data) => console.log(data))
			.catch((err) => console.error(err));
		}
		
	}
	render() {
		console.log(this.state);
		return (
			<div className="my-container">
				<div className="row">
					<div className="col-md-12">
						<div className="form-group mySpacing">
							<input type="file" className="form-control inputfile" id="photoupload" onChange={this.selectFile.bind(this)} data-multiple-caption="{count} files selected" multiple />
							<label htmlFor="photoupload"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span>Choose a file&hellip;</span></label> 
						{
							this.state.files.length > 0 && 
							<span>
								{
									this.state.files.map((value, key) => {
										return <span key={key}>{value.name}, </span>					  
									})	
								}
							</span>
						}
						</div>
						<br />
						<button type="submit" className="btn btn-primary form-control" onClick={this.submitFrm.bind(this)}>Upload</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myReducer: state.MyReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callChangeTab: (tab) => {
			dispatch(myActions.changeTab(tab));
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(Upload);