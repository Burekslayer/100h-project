const Post = require('../models/Post') //Importing Todos model
const Favourite = require('../models/Favourite')
const Featured = require('../models/Featured')
const cloudinary = require('../middleware/cloudinary')
const { Schema } = require('mongoose')
const multiparty = require('multiparty')
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //replace with your email provider
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
}); 

module.exports = {
    getIndex: async (req,res)=>{ 
        try{ 
            const postItems = await Post.find({})
            const favouriteItems = await Favourite.find({})
            const featuredItems = await Featured.find({})
            
            res.render('index.ejs', {posts: postItems, favourites: favouriteItems, featured: featuredItems} )
        }catch(err){ 
            console.log(err) 
        }
    },
    getAbout: async (req, res)=>{
      try{
        res.render('about.ejs')
      }catch(err){
        console.log(err)
      }
    },
    getServices: async (req, res)=>{
      try{
        res.render('services.ejs')
      }catch(err){
        console.log(err)
      }
    },
    getProjects: async (req, res)=>{
      try{
        res.render('projects.ejs')
      }catch(err){
        console.log(err)
      }
    },
    getContact: async (req, res)=>{
      try{
        res.render('contact.ejs')
      }catch(err){
        console.log(err)
      }
    },
    sendEmail: async (req, res) => {
        //1.
        let form = new multiparty.Form();
        let data = {};
        form.parse(req, function (err, fields) {
          console.log(fields);
          Object.keys(fields).forEach(function (property) {
            data[property] = fields[property].toString();
          });
      
          //2. You can configure the object however you want
          const mail = {
            header:{
              'New request!': 'New Request!'
            },
            from: 'NAME: ' + data.firstName + ' ' + data.lastName,
            to: process.env.EMAIL,
            subject: `New Request from ${data.firstName}`,
            text: ` NAME:  ${data.firstName + ' ' + data.lastName} <${data.email}>, \n MESSAGE:  ${data.message}, \n COUNTRY:  ${data.countries}, \n SERVICE TYPE:  ${data.serviceType}.`,
            
          };
      
          //3.
          transporter.sendMail(mail, (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).send("Something went wrong.");
            } else {
              alert("Email successfully sent to recipient!");
            }
          });
        });
    }
}