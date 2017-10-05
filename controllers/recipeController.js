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
    db.Recipe.find({})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },

  // Get selected Challenge: app.get("/challenge/:id", 
  findOne: function(req, res) {
    const id = req.params.id;
    db.Recipe.findOne({ _id: id })
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

  // Remove recipe: app.delete("recipe/:id", 
  removeRecipe: function(req, res) {
    const selected = req.params.id;
    db.Recipe.remove({ _id: selected})
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  } 
};
