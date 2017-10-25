import React, { Component } from "react";
import Dropzone from 'react-dropzone';
import upload from 'superagent';

 class FileUpload extends Component{

  state = {
    imageFiles: []
  };

  onDrop = (files) => {

    this.setState({
      imageFiles: files
    });

    upload.post('/upload/' + this.props.id)
    .attach('img', files[0])
    .end((err, res) => {
      console.log("now: " + this.state.imageFiles);
      if (err) { 
        console.log(err);
        window.location.reload();
      } else {
      alert('File uploaded!');
      window.location.reload();
      }
      console.log("later: " + this.state.imageFiles);
    });
  }

  render(){
    return (
        <div>
          
          {this.state.imageFiles.length > 0 ? 
            <div>
              <h2>Uploading {this.state.imageFiles.length} file(s)...</h2>
              <div>
                {this.state.imageFiles.map((file) => 
                  <img className="profileImage" src={file.preview} alt="profile pic" /> 
                )}
              </div>
            </div> 
          :
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div>Try dropping a file here, or click to select a file to upload.</div>
            </Dropzone>
          }
        </div>
    );
  }
};

export default FileUpload;