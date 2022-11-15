const express = require('express')                                  // Express module
const router = express.Router()                                     // Allows using the express Router() function
const authController = require('../controllers/auth')               // This imports the auth controller
const homeController = require('../controllers/home')               // This imports the home controller 
const { ensureAuth, ensureGuest } = require('../middleware/auth')   //imports ensureAuth function from middleware

router.get('/', homeController.getIndex)                 // "/todos" route calling getIndex method
router.get('/login', authController.getLogin)            //"/todos/login" route with post get calling getLogin method
router.post('/login', authController.postLogin)          //"/todos/login" route with post method calling postLogin method
router.get('/logout', authController.logout)             //"/todos/logout" route with get method calling logout method
// router.get('/signup', authController.getSignup)       //"/todos/signup" route with get method calling getIndex method
// router.post('/signup', authController.postSignup)     //"/todos/signup" route with post method calling getIndex method

module.exports = router