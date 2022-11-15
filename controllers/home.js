const Post = require('../models/Post') //Importing Todos model
const Favourite = require('../models/Favourite')
const Featured = require('../models/Featured')
const cloudinary = require('../middleware/cloudinary')
const { Schema } = require('mongoose')

module.exports = {
    getIndex: async (req,res)=>{ 
        console.log(req.user)
        try{ 
            const postItems = await Post.find({})
            const favouriteItems = await Favourite.find({})
            const featuredItems = await Featured.find({})
            
            res.render('index.ejs', {posts: postItems, favourites: favouriteItems, featured: featuredItems} )
        }catch(err){ 
            console.log(err) 
        }
    }
}