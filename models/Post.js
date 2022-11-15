const mongoose = require('mongoose') // importing mongoose 

const PostSchema = new mongoose.Schema({ // creates a new mongoose Schema
  title:{
    type: String,
    require: true
  },
  caption:{
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  cloudinaryId: {
    type: String,
    require: true
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Post', PostSchema) // exporting the Todo model
