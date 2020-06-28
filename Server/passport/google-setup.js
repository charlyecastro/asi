const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleKeys = require("../keys/keys")
const User = require("../models/user")
const mongoose = require("mongoose");
const GOOGLE_CLIENT_ID = googleKeys.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = googleKeys.GOOGLE_CLIENT_SECRET



passport.serializeUser(function (user, done) {
  /*
  From the user take just the id (to minimize the cookie size) and just pass the id of the user
  to the done callback
  PS: You dont have to do it like this its just usually done like this
  */

  done(null, user);
});

passport.deserializeUser(function (user, done) {
  /*
  Instead of user this function usually recives the id 
  then you use the id to select the user from the db and pass the user obj to the done callback
  PS: You can later access this data in any routes in: req.user
  */
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost/google/callback"
},
  async function (accessToken, refreshToken, profile, done) {
    /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */

    const currentUser = await User.findOne({
      googleId: profile._json.sub
    });
    // create new user if the database doesn't have this user
    if (!currentUser) {
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        googleId: profile._json.sub,
        displayName: profile._json.name,
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        picture: profile._json.picture,
        email: profile._json.email
      }).save();
      if (newUser) {
        console.log("NEW USER!!!")
        console.log(profile)
        return done(null, newUser);
      }
    }
    console.log("USER  ALREADY EXISTS!!!")
    console.log(profile)
    return done(null, currentUser)
  }
));