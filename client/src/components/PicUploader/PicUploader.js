import React, { Component } from "react";
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import express from 'express';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';
 
const app = express();

app.use('/static', express.static('./server/static'));
 
app.use(corsPrefetch);
 
app.post('/notmultiple', imagesUpload(
    './server/static/files',
    'http://localhost:9090/static/files'
));

class PicUploader extends Component {
    render() {
        return (
            <ImagesUploader
                url="http://localhost:9090/notmultiple"
                optimisticPreviews
                multiple={false}
                onLoadEnd={(err) => {
                    if (err) {
                        console.error(err);
                    }
                }}
                label="Upload a picture"
                />
        );
    }
}

export default PicUploader;