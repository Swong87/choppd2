const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { 
  	type: String, 
  	required: true 
  },
  image: String,
  user: { 
  	type: String 
  },
  _userId: {
  	type: Schema.Types.ObjectId,
  	ref: 'User'
  },
  _challengeId: {
  	type: Schema.Types.ObjectId,
  	ref: 'Challenge'
  },
  ingredients: Array,
  method: { 
  	type: String, 
  	validate: [
      // Function takes in the value as an argument
      function(input) {
        // If this returns true, proceed. If not, return an error message
        return input.length >= 6;
      },
      // Error Message
      "Longstring should be longer."
    ]
  },
  date: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
