const LocalStrategy = require('passport-local').Strategy //we are importing passport local strategy
const mongoose = require('mongoose') //importing mongoose
const User = require('../models/User') //importing user model

module.exports = function (passport) { //This function will get passport as the argument
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => { //using local strategy of passport
    User.findOne({ email: email.toLowerCase() }, (err, user) => { //we are searching the user email in user model 
      if (err) { return done(err) }//error
      if (!user) {//if no user is found in the database
        return done(null, false, { msg: `Email ${email} not found.` }) //sending the error message
      }
      if (!user.password) {//if no password is found
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
      }
      user.comparePassword(password, (err, isMatch) => {//comparing if password enter is correct or not
        if (err) { return done(err) }
        if (isMatch) { //if its a match then redirect to /todos page
          return done(null, user)
        }
        return done(null, false, { msg: 'Invalid email or password.' }) //alert the message that entered email or password is not correct
      })
    })
  }))
  

  passport.serializeUser((user, done) => { // Stores the user ID into browsers session
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => { // Checks if the user ID is present in mongoDB session
    User.findById(id, (err, user) => done(err, user))
  })
}
