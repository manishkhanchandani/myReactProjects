import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Dropzone from 'react-dropzone';
import request from 'superagent';

import Home from './project2/Home.js';
import About from './project2/About.js';
import Contact from './project2/Contact.js';

const CLOUDINARY_UPLOAD_PRESET = 'l3ok9dgh';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/des3jgoof/upload';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: '',
      uploadedFile: null
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }
  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      console.log('response is ', response);
      if (err) {
        console.error(err);
      }

      if (response.body.url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.url
        });
      }
    });
  }

  render() {
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

          <div>
            {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div>
              <p>{this.state.uploadedFile.name}</p>
              <img src={this.state.uploadedFileCloudinaryUrl} />
            </div>}
          </div>

          {
            (this.state.uploadedFileCloudinaryUrl.length == 0) ? null :

              this.state.uploadedFileCloudinaryUrl.map((value, key) => {
                return <div key={key}>
                  <div>
                    <p>{this.state.uploadedFile[key].name}</p>
                    <img src={value} />
                  </div>
                </div>
              })

          }
			<hr />
			<h1>Footer</h1>
		  </div>
		</Router>
    );
  }
}

export default App;
