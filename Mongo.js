
const express=require('express');
const mongoose = require('mongoose')
const Blog = require('./models/blogs')

const app = express();

const dburi = 'mongodb+srv://ahd:JnZoTn5lLZpOSWNa@cluster0.eh9taen.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(dburi)
.then((result)=> app.listen(3000))   
.catch((err)=> console.log(err));

app.set('view engine','ejs');  


app.use(express.static('public'))    

app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title:'new blog',
        snippet:'about',
        body:'more about new blog'
    });
    blog.save()        // to save it to database
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        })
})
app.get('/',(req,res) =>{
   res.redirect('/blogs')  ;   
});

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt: -1})   //sort from newest to oldest 
    .then((result)=>{
       res.render('index',{title:'all blogs', blog: result})
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/single-blog',(req,res)=>{
    Blog.findById('64eb82cc9b03dc3bb66dcbe5')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{title: 'about'});
});

app.get('/create',(req,res)=>{
    res.render('create', {title: 'creat'})
})
app.use((req,res)=>{                                                       
    res.status(404).render('404',{title: '404'} )     
})
