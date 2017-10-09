// Database configuration
const databaseUrl = "choppdb";
const collections = ["choppdbData"];
const mongoose = require("mongoose");
const db = require("../models");

module.exports = {
  // Create new
  createUser: function(req, res) {
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },

  findAll: function(req, res) {
    db.User.find({})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },

  // Get selected Challenge: app.get("/challenge/:id", 
  findOne: function(req, res) {
    const id = req.params.id;
    db.User.findOne({ _id: id })
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  }
};
