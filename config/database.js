const mongoose = require('mongoose') // Mongoose module

const connectDB = async () => { // Connection function for connecting to MongoDB
  try {
    const conn = await mongoose.connect("mongodb+srv://burekslayer:soulhunter532021@cluster0.ce7kqwr.mongodb.net/jecka-sajt?retryWrites=true&w=majority",
      //process.env.DB_STRING
     {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })// This is connecting to our MongoDB cloud

    console.log(`MongoDB Connected: ${conn.connection.host}`)//This is console logging the connection msg
  } catch (err) {
    console.error(err) //Logging the error message
    process.exit(1)//Stops the server when th error happens 
  }
}

module.exports = connectDB //Exports the connection function
