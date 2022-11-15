const express = require('express')                                  // Express module
const router = express.Router()                                     // Express router method
const upload = require('../middleware/multer')
const postController = require('../controllers/posts')             // Importing the todos controller
const { ensureAuth } = require('../middleware/auth')                // Importing the auth middleware

router.get('/', ensureAuth, postController.getPosts)                               // Calling the getTodo method if ensureAuth is true

router.post('/createPost', upload.single("file"), postController.createPost)       // Calling the createTodo method

router.post('/createFavourite', upload.single("file"), postController.createFavourite) 

router.post('/createFeatured', upload.single("file"), postController.createFeatured) 

// router.post('/createPost', upload.single("file"), postController.createPost) 

// router.post('/createPost', upload.single("file"), postController.createPost) 

router.delete('/deletePost', postController.deletePost)                            // Calling the deleteTodo method

module.exports = router                                                             // exports the todo router