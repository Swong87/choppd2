const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  password: {
  	type: String,
  	required: true
  },
  username: {
  	type: String,
  	unique: true
  },
  recipes: [{
    type: Schema.Types.ObjectId,
    ref: "Recipe"
  }],
  date: { type: Date, default: Date.now }
});
userSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};
userSchema.pre('save', function(next) {
	var user = this;
	// only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
