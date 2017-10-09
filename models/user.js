const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: String,
  username: String,
  recipes: Array,
  date: { type: Date, default: Date.now }
});
userSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
