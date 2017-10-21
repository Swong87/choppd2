const express = require("express");
const router = require("express").Router();
const multer = require("multer");
const AWS = require("aws-sdk");

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

router.route('/')
  .post(upload.single('img'), (req, res) => {
  // req.file is the 'theseNamesMustMatch' file
  console.log(req.file);
  console.log(res);
  s3.putObject({
      Bucket: 'choppdimages',
      Key: req.file.originalname, 
      Body: req.file,
      ACL: 'public-read', // your permisions  
    }, (err) => { 
      if (err) return res.status(400).send(err);
      res.send('File uploaded to S3');
  });
});

module.exports = router;