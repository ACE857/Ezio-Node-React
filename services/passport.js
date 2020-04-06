const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id); // id given by mongo
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      // existing user is model instance
      if (existingUser) {
        // userid present
        return done(null, existingUser);
      }
      // user is not present
      const user = await new User({ googleId: profile.id }).save();
      // user is a model instance returned by mongoose
      done(null, user);
    }
  )
);

// 1st arg oauth api keys and details of google strategy
// 2nd arg callback function whenevr user is redirected from googlt oauth

/*
console.log(accessToken);
      console.log("refreshToken:", refreshToken);
      console.log(profile);
*/

/*
    every time we access database we are making asyncrous request
    and it returns a promise

    in case of UnhandledPromiseRejectionWarning MongoNetworkError: failed to connect to server
    whitelist ip address 0.0.0.0/0 -- all ip address
*/

/*
    while deploying proxy problems can be solved either by adding proxy: true to our google strategy
    or adding another variable to our dev and prod files and adding complete url insted of relative
*/
