import React, { Component } from "react";
import Dropzone from 'react-dropzone';
import upload from 'superagent';

 class FileUpload extends Component{
    onDrop = (files) => {
      upload.post('/upload')
      .attach('img', files[0])
      .end((err, res) => {
        if (err) { 
          console.log(err);
        } else {
        alert('File uploaded!');
        }
        console.log(res);
      })
    }

    render(){
      return (
          <div>
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div>Try dropping a file here, or click to select a file to upload.</div>
            </Dropzone>
          </div>
      );
    }
};

export default FileUpload;