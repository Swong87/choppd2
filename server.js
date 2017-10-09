// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const routes = require("./routes");
// NEW
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const LocalStrategy = require('passport-local').Strategy;

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Serve up static assets
app.use(express.static("client/build"));

// NEW
app.use(cookieParser());
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session()); 
// END NEW

// Add routes, both API and view
app.use(routes);
// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/choppdb",
  {
    useMongoClient: true
  }
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
