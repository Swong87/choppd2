// Database configuration
const databaseUrl = "choppdb";
const collections = ["choppdbData"];
const mongoose = require("mongoose");
const db = require("../models");

module.exports = {
  // Get selected Challenge: app.get("/challenge/:id", 
  findById: function(req, res) {
    if (req.user) {
      const id = req.params.id;
      db.User.findOne({ username: id })
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => console.log(err));
    } else {
      res.json({ error: "Please login", statusCode: 401 })
    }
  },

  deletePic: function(req, res) {
    if (req.user) {
      const id = req.params.id;
      db.User.findOneAndUpdate(
        { username: id }, 
        { $unset: { image: "" } })
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => console.log(err));
    } else {
      res.json({ error: "Please login", statusCode: 401 })
    }
  },

  updateUser: function(req, res) {
    if (req.user) {
      const id = req.params.id;
      db.User.findOneAndUpdate(
        { _id: id }, 
        { $set: { bio: req.body.bio } })
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => console.log(err));
    } else {
      res.json({ error: "Please login", statusCode: 401 })
    }
  }
};