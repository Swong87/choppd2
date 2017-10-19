const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passLocalMon = require("passport-local-mongoose");

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  bio: { type: String },
  recipes: [{
	    type: Schema.Types.ObjectId,
	    ref: "Recipe"
  	}],
  date: { type: Date, default: Date.now }
});

userSchema.plugin(passLocalMon);

const User = mongoose.model("User", userSchema);

module.exports = User;
