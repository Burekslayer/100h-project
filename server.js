const express = require('express')                          //This is express Modules
const app = express()                                       //This is the app variable which contains all the express methods
const mongoose = require('mongoose')                        //This is mongoose Modules
const passport = require('passport') //This is passport Modules is used for authentication and provides different startegies
const session = require('express-session') //This is express session module its use for storing sessions into the browsers
const MongoStore = require('connect-mongo')(session) //This is module used for storing our cookies or session in MongoDB
const flash = require('express-flash') //This module is used to show error or messeages in our ejs
const logger = require('morgan') //This module is used for log every request happening in the app
const connectDB = require('./config/database') //We are importing the connection function
const mainRoutes = require('./routes/main') // Imports the main routes
const postRoutes = require('./routes/posts') // Importing the todo routes
const cloudinary = require('cloudinary').v2;
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");

require('dotenv').config({path: './config/.env'}) // require the .env file

// Passport config
require('./config/passport')(passport) // include passport.js file with an passport module as an argument

connectDB() // imported function for database connection

app.set('view engine', 'ejs') // setting the default view engine
app.use(express.static('public')) // includes all the files from public folder
app.use(express.urlencoded({ extended: true })) ////Tells the express to decode and encode URLs where the header matches the content. Supports arrays and objects
app.use(express.json()) //Parse Json content from incoming requests
app.use(logger('dev')) //loggs the request comming to server
// Sessions
app.use(
    session({ //making a cookie
      secret: 'keyboard cat', //using a secret key for the cooke
      resave: false, //?
      saveUninitialized: false, //?
      store: new MongoStore({ mongooseConnection: mongoose.connection }), //this will save cookie to mongoDB
    })
)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //replace with your email provider
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});  
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
// Passport middleware
app.use(passport.initialize()) //initializing the passport
app.use(passport.session()) // using passport session method

app.use(flash()) //using flash module to flash error message on ejs
  
app.use('/', mainRoutes) //using mainRoutes
app.use('/post', postRoutes) //using todosRoutes
 
app.listen(process.env.PORT, ()=>{ //listening on the PORT written on .env file
    console.log('Server is running, you better catch it!') //logs when server start running 
})    