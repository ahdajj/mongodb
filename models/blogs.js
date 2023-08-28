const mongoose = require('mongoose')



  // creat schema 
  const Schema = mongoose.Schema ; 
  const blogSchema = new Schema ({
    title:{
        type:String,        //define typpe 
        required:true       // this mean the title field is required for our document
    },
    snippet:{
        type:String,
        required:true
    },
    body: {
        type:String,
        required:true
    }
}, {timestamps: true})             // optional no need for it

    // create models 
const Blog = mongoose.model('Blog' , blogSchema)    // the name must be te same as collection in database , the second argument is the schema we want to base this model on 
module.exports = Blog;