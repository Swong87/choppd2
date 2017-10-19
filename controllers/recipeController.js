// Database configuration
const databaseUrl = "choppdb";
const collections = ["choppdbData"];
const mongoose = require("mongoose");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

const db = require("../models");

module.exports = {
  // Get all Recipes: app.get("/discover", 
  findAll: function(req, res) {
    if (req.user) {
      db.Recipe.find({})
        .sort({ date: -1 })
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => console.log(err));
    } else {
      res.json({ error: "Please login", statusCode: 401 })
    }
  },

  // Get all Recipes: app.get("/discover", 
  findRecipes: function(req, res) {
    if (req.user) {
      const username = req.params.id;
      db.Recipe.find({ user: username })
        .sort({ date: -1 })
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => console.log(err));
    } else {
      res.json({ error: "Please login", statusCode: 401 })
    }
  },

  // Get selected Recipe: app.get("/recipe/:id", 
  findOne: function(req, res) {
    if (req.user) {
      const id = req.params.id;
      db.Recipe.findOne({ _id: id })
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => console.log(err));
    } else {
      res.json({ error: "Please login", statusCode: 401 })
    }
  },

  // Create new recipe: app.post("/recipe/:id", 
  createRecipe: function(req, res) {
    if (req.user) {
      const selected = req.params.id;
      const chosen = req.body.user;
      const newRecipe = new db.Recipe(req.body);
      newRecipe.save(function(error, doc) {
        if(error){
          res.send(error);
        } else {
          db.Challenge
            .findOneAndUpdate(
              { _id: selected }, 
              { $push: { "recipe": doc._id } }, 
              { new: true })
            .then(dbModel => res.json({results: dbModel, sess: req.session}))
            .catch(err => console.log(err)),
          db.User
          .findOneAndUpdate(
            { username: chosen }, 
            { $push: { "recipe": doc._id } }, 
            { new: true })
          .then(dbModel => res.json({results: dbModel, sess: req.session}))
          .catch(err => console.log(err));
        };
      });
    } else {
      res.json({ error: "Please login", statusCode: 401 })
    }
  },

  // Remove recipe: app.delete("recipe/:id", 
  removeRecipe: function(req, res) {
    if (req.user) {
      const selected = req.params.id;
      db.Recipe.remove({ _id: selected})
        .then(dbModel => res.json(dbModel))
        .catch(err => console.log(err));
    } else {
      res.json({ error: "Please login", statusCode: 401 })
    }
  } 
};
