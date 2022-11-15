module.exports = {
    ensureAuth: function (req, res, next) { //ensure auth function to check if the user is already logged in
      if (req.isAuthenticated()) { //Checking if user is authenticated 
        return next() //go to next middleware
      } else {
        res.redirect('/') // If user is not authenticated then redirect the user to main page
      }
    }
  }
  