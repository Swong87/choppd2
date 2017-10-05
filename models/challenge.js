const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  title: { 
  	type: String, 
  	required: true 
  },
  image: String,
  user: { 
  	type: String
  },
  user_id: String,
  ingredients: Array,
  recipe: [{
    type: Schema.Types.ObjectId,
    ref: "Recipe"
  }],
  date: { type: Date, default: Date.now }
});

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
