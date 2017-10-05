// Database configuration
const databaseUrl = "choppdb";
const collections = ["choppdbData"];
const mongoose = require("mongoose");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

const db = require("../models");

module.exports = {
  // Get all Challenges: app.get("/discover", 
  findAll: function(req, res) {
    db.Challenge.find({})
      .sort({ date: -1 })
      .populate("recipe")
      .exec(function(error, doc) {
        if (error) {
          res.send(error);
        };
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },

  // Get selected Challenge: app.get("/challenge/:id", 
  findOne: function(req, res) {
    const id = req.params.id;
    db.Challenge.findOne({ _id: id })
      .populate("recipe")
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },

  // Create new challenge: app.post("/discover", 
  createChallenge: function(req, res) {
    db.Challenge.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },

  // Create new recipe: app.post("/challenge/:id", 
  createRecipe: function(req, res) {
    const selected = req.params.id;
    const newRecipe = new Recipe(req.body);
    newRecipe.save(function(error, doc) {
      if(error){
        res.send(error);
      } else {
        db.Challenge
          .findOneAndUpdate(
            { _id: selected }, 
            { $push: { "recipe": doc._id } }, 
            { new: true })
          .then(dbModel => res.json(dbModel))
          .catch(err => console.log(err));
      };
    });
  },

  // Remove challenge: app.delete("challenge/:id", 
  removeChallenge: function(req, res) {
    const selected = req.params.id;
    db.Challenge.remove({ _id: selected})
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },

  // Remove recipe: app.delete("recipe/:id", 
  removeRecipe: function(req, res) {
    const selected = req.params.id;
    db.Recipe.remove({ _id: selected})
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  } 
};
