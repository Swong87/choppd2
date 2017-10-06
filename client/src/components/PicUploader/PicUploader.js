import React, { Component } from "react";
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
 

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