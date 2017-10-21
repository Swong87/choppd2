const express = require("express");
const router = require("express").Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const db = require('../models');

// Amazon s3 config
const s3 = new AWS.S3();
AWS.config.update(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    subregion: 'us-east-2',
  });

// const router = new express.Router();

// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
});

router.route('/:id')
  .post(upload.single('img'), (req, res) => {
  // req.file is the 'theseNamesMustMatch' file
  const selected = req.params.id;
  // console.log(req.file);
  // console.log(res);
  s3.putObject({
      Bucket: 'choppdimages',
      Key: req.file.originalname, 
      Body: req.file.buffer,
      ACL: 'public-read', // your permisions  
    }, (err) => { 
      if (err) return res.status(400).send(err);
      // res.send('File uploaded to S3');
  }), function(req, res){
    
    const baseURL = "https://s3.us-east-2.amazonaws.com/choppdimages/";
    db.User
    .findOneAndUpdate(
      { username: selected },
      { $set: { image: baseURL + req.file.originalname } })
      .then(dbModel => res.json({results: dbModel, sess: req.session}))
      .catch(err => console.log(err));
  }
  
});

module.exports = router;