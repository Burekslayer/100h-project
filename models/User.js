const bcrypt = require('bcrypt') //Importing Bcrypt and with the help of this function we can hash our password
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({ // Makes a user schema for storing user information
  userName: { type: String, unique: true }, //username should be string and unique
  email: { type: String, unique: true }, //email should be string and unique
  password: String // password should be string
})


// Password hash middleware.
 
 UserSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})


// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

//$jahcvvfiacb === $jahksdwkvdb


module.exports = mongoose.model('User', UserSchema) //exporting User Schema
