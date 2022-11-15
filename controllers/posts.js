const Post = require('../models/Post') //Importing Post model
const Favourite = require('../models/Favourite')
const Featured = require('../models/Featured')
const cloudinary = require('../middleware/cloudinary')
const { Schema } = require('mongoose')

module.exports = { //Exporting all the methods related to posts route
    getPosts: async (req,res)=>{ //method to render all the posts
        console.log(req.user)//logging the user info
        try{ //try block
            const postItems = await Post.find({user: req.user.id})// getting all the posts from db which matches users 
            const favouriteItems = await Favourite.find({user: req.user.id})
            const featuredItems = await Featured.find({user: req.user.id})



            res.render('post.ejs', {posts: postItems, favourites: favouriteItems, featured: featuredItems} ) //Rendering all the todos on ejs file 
        }catch(err){  // catch block start
            console.log(err) //logging the error if it happens 
        }
    },
    createPost: async (req, res)=>{ //method to create a post 
        try{ //try block
            const result = await cloudinary.uploader.upload(req.file.path)

            await Post.create({                         //using mongoose method (create) to create a new entry
                title: req.body.title,
                caption: req.body.caption,
                image: result.secure_url, 
                cloudinaryId: result.public_id,
                user: req.user.id,
            }) 
            console.log('Post has been added!')         // logging the added post
            res.redirect('/post')                      //Redirecting to post page
        }catch(err){                                    // catch block start
            console.log(err)                            //logging the error if it happens 
        }
    },
    createFavourite: async (req, res)=>{ //method to create a post 
        try{ //try block
            const result = await cloudinary.uploader.upload(req.file.path)

            await Favourite.create({                         //using mongoose method (create) to create a new entry
                image: result.secure_url, 
                cloudinaryId: result.public_id,
                user: req.user.id,
            }) 
            console.log('Post has been added!')         // logging the added post
            res.redirect('/post')                      //Redirecting to post page
        }catch(err){                                    // catch block start
            console.log(err)                            //logging the error if it happens 
        }
    },
    createFeatured: async (req, res)=>{ //method to create a post 
        try{ //try block
            const result = await cloudinary.uploader.upload(req.file.path)

            await Featured.create({                         //using mongoose method (create) to create a new entry
                image: result.secure_url, 
                cloudinaryId: result.public_id,
                user: req.user.id,
            }) 
            console.log('Post has been added!')         // logging the added post
            res.redirect('/post')                      //Redirecting to post page
        }catch(err){                                    // catch block start
            console.log(err)                            //logging the error if it happens 
        }
    },
    deletePost: async (req, res)=>{                     //method to delete a post
        console.log(req.body.postIdFromJSFile)
        try{ //try block start
            await Post.findOneAndDelete({_id: req.body.postIdFromJSFile})
            await Favourite.findOneAndDelete({_id: req.body.postIdFromJSFile})
            await Featured.findOneAndDelete({_id: req.body.postIdFromJSFile})
            console.log('Deleted Post') //logging the delete post message
            res.json('Deleted It') // responding to the browser with a message
        }catch(err){ // catch block start
            console.log(err) //logging the error if it happens 
        }
    }
}    