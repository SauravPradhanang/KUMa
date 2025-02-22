const passport = require('passport');
//const express=require('express');
const GoogleStrategy = require('passport-google-oauth20');
//const jwt = require('jsonwebtoken');
const {User} = require('../models/user');
const { Notification } = require("../models/notification");

passport.use(new GoogleStrategy({
    clientID: process.env.google_clientID,
    clientSecret: process.env.google_clientSecret,
    callbackURL: "http://localhost:3000/users/google/redirect"
}, async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ googleID: profile.id });

    if (!user) {
        let user = await new User({
            name: profile.displayName,
            googleID: profile.id,
            email: profile.emails?.[0]?.value
        });

        let notification = new Notification({
            message: "Welcome to our website.",
            user: user.id,
          });
        
          await notification.save();

        await user.save();
        console.log('user created with google');
    }
    
    done(null, user);
}))

module.exports= passport;