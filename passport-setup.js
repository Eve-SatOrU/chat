const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    // find or create a user with the given Google profile ID
    User.findOrCreate({
      where: {
        googleId: profile.id
      },
      defaults: {
        email: profile.emails[0].value,
        username: profile.displayName
      }
    })
      .then(user => done(null, user[0]))
      .catch(error => done(error));
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => done(null, user))
    .catch(error => done(error));
});
