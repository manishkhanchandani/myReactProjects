import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Dropzone from 'react-dropzone';
import request from 'superagent';

import Home from './project2/Home.js';
import About from './project2/About.js';
import Contact from './project2/Contact.js';
import A1 from './fileupload/A1.js';

const CLOUDINARY_UPLOAD_PRESET = 'l3ok9dgh';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/des3jgoof/upload';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: [],
      uploadedFile: null
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files
    }, () => {
      let myFiles = Object.assign(files);
      console.log(myFiles);
      this.handleImageUpload(myFiles);
    });


  }
  handleImageUpload(files) {
    var file = files.pop();
    if (!file) {
      return;
    }
    console.log('file is ', file);
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      console.log('response is ', response);
      if (err) {
        console.error(err);
      }

      if (response.body.url !== '') {
        var img = response.body.url;
        var images = this.state.uploadedFileCloudinaryUrl;
        images.push(img);
        this.setState({
          uploadedFileCloudinaryUrl: images
        });
        this.handleImageUpload(files);
      }
    });

  }

  render() {
    console.log('state is ', this.state);
    return (
		<Router>
		  <div>
		  	<h1>Header</h1>
			<p><a href="/">Home</a> | <a href="/about">About</a> | <a href="/contact">Contact</a></p>
			<hr />
      <Dropzone
            multiple={true}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>


          <A1 uploadedFile={this.state.uploadedFile} />

			<hr />
			<h1>Footer</h1>
		  </div>
		</Router>
    );
  }
}

export default App;
