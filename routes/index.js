const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usersController = require("../controllers/usersController");
const db = require("../models");

// API Routes
router.use("/api", apiRoutes);

router.route("/login")
  .post(passport.authenticate('local'), function(req, res) {
      res.redirect('/profile/' + req.user.id);
  });

router.route('/logout')
.get(function(req, res) {
  req.logout();
  res.redirect('/');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // Compares password with users password
      user.comparePassword(password, function(err, isMatch) {
        // if its not a match, it will send error
        if(!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        // or else it will return user
        return done(null, user);;
      })
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findById(id, function(err, user) {
    done(err, user);
  });
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});



module.exports = router;
