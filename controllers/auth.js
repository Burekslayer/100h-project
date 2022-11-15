const passport = require('passport') //// Passport module
const validator = require('validator') // Validator module
const User = require('../models/User') // Imports the User model

 exports.getLogin = (req, res) => { //get Login 
    if (req.user) { //req.user is comming from passport(we will only get this when user is logged in)
      return res.redirect('/post') //if user is logged in, user will be directed to the home page
    }
    res.render('login', { //if user is not logged in, user will be directed to login page
      title: 'Login'
    })
  }
  
  exports.postLogin = (req, res, next) => {//here we are loggin user in
    const validationErrors = [] //This is the array of errors
    if (!validator.isEmail(req.body.email)) {//Checks if the entered email is in the correct form
      validationErrors.push({ msg: 'Please enter a valid email address.' }) // Pushes the error message into an array if entered email is not in the correct form
    }
    if (validator.isEmpty(req.body.password)) { // Checks if the entered password is empty
      validationErrors.push({ msg: 'Password cannot be blank.' }) // If entered password is empty, pushed the error message into an array
    }
  
    if (validationErrors.length) { // Checks if error array is empty or not
      req.flash('errors', validationErrors) // Creates an object which can be used in ejs to loop through error messages
      return res.redirect('/login') // If error array is empty, redirects the user login screen
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => { //using auth function which passport provides us to check if the user is signed up
      if (err) { return next(err) } //checking if a error happend and passing it to next middleware
      if (!user) {//check if user doesnot exists
        req.flash('errors', info) //then flash the errors on login page
        return res.redirect('/login') //and redirect the user to login page and return
      }
      req.logIn(user, (err) => { //it calling loggin function
        if (err) { return next(err) } //if error happens paas it to next middleware
        req.flash('success', { msg: 'Success! You are logged in.' }) //if success then show the message on ejs
        res.redirect(req.session.returnTo || '/post') //redirect to /todos page
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => { //Log out function
    req.logout(() => { //logs user out
      console.log('User has logged out.')
    })
    req.session.destroy((err) => { //destroys session from browser
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null //removes user info from req object
      res.redirect('/') //redirect the user to home page
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) {//req.user is comming from passport(we will only get this when user is logged in)
      return res.redirect('/post') //if user is logged in, user will be directed to the home page
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' }) // Checking if password's length is of minimum 8 in length
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' }) //Checking if password and confirmPassword is same
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false }) //Same as login
  
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    }) //Creating user object
  
    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName} //Checking if the entered email or username already exists in database
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' }) //sends the error message to ejs (signup)
        return res.redirect('/signup') //redirecting to signup page
      }
      user.save((err) => { //If the entered credentials are not found in the database, stores the new user info into MondoDB
        if (err) { return next(err) } // passes error to next middleware
        req.logIn(user, (err) => { // After the user is signed up, the user logged in
          if (err) {
            return next(err)
          }
          res.redirect('/post') // Redirects to /todos page
        })
      })
    })
  }