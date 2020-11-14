const { Router } = require("express");
const Todo = require("../models/Todo");
const Product = require("../models/Product");
const router = Router();
const Post = require("../models/Post");
const Project = require('../models/Project')
const upload = require('../middleware/upload')
const moment = require('moment');
const Category = require("../models/Category");
const Technology = require("../models/Technology");


router.post('/giveAll', async(req,res)=>{
  const data = await Post.find().lean()
  //в переменную data = получить с БД что-то
  res.json({data})
  //отправить data обратно
})

//Главная страница

router.get('/mainPage', async(req,res)=>{
  const data = await Post.find().sort({ $natural: -1 }).limit(8).lean()
  res.render("mainPage",{ 
    mainPage:true,
    isMain:true,
    data
  })
})

router.get('/works', async(req,res)=>{
  const works = await Project.find().lean()
  res.render("works",{
    isWorks:true,
    works
  })
})

router.get('/connect', async(req,res)=>{
  const technology = await Technology.find().lean()
  res.render("resume",{
    isConnect:true,
    technology
  })
})

router.get('/blogPage', async(req,res)=>{
  const limit = 8;
  const page = parseInt(req.query.page)
  
  const posts = await Post.paginate({},{lean:true , limit:limit , page:page, sort:{$natural:-1}})
  const categories = await Category.find().sort({ $natural: -1 }).limit(20).lean()

  res.render("blog",{
    isBlog:true,
    posts:posts,
    categories:categories,
  })
})


router.get('/admin' , async(req,res)=>{
  const posts = await Post.find().lean()
  const projects = await Project.find().lean()
  const cats = await Category.find().lean()
  res.render('adminPanel',{
    isAdmin:true,
    posts,
    projects,
    categories:cats,
  })
})



module.exports = router;
