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
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        // existing user is model instance
        if (existingUser) {
          // userid present
          console.log("user present");
          done(null, existingUser);
        } else {
          // user is not present
          new User({ googleId: profile.id }).save().then(user => {
            // user is a model instance returned by mongoose
            done(null, user);
          });
          console.log("user added");
        }
      });
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
    whitelist ip address 0.0.0.0/0
*/
