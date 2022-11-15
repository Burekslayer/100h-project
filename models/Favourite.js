const mongoose = require('mongoose') // importing mongoose 

const FavouriteSchema = new mongoose.Schema({ // creates a new mongoose Schema
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

module.exports = mongoose.model('Favourite', FavouriteSchema) // exporting the Todo model
