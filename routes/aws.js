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

// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
});

// When route '/upload/:id' is hit
router.route('/:id')
  .post(upload.single('img'), (req, res) => {
  // 'selected' holds the user id connected to where you upload the image
    const selected = req.params.id;
    // first part of image url
    const baseURL = "https://s3.us-east-2.amazonaws.com/choppdimages/";
    // Upload image to AWS
    s3.putObject({
        Bucket: 'choppdimages', // Your bucket name
        Key: req.file.originalname, 
        Body: req.file.buffer,
        ACL: 'public-read', // your permissions  
      }, (err) => { 
        if (err) return res.status(400).send(err);
    }),
    // After uploading the image to AWS, save img url to user.image
    db.User
      .findOneAndUpdate(
        { username: selected },
        { $set: { image: baseURL + req.file.originalname } })
      .catch(err => console.log(err));
});

module.exports = router;