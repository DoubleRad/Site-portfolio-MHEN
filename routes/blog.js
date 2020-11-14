const { Router } = require("express");
const router = Router();
const moment = require('moment')
const mongoosePaginate = require('mongoose-paginate-v2')
const Post = require("../models/Post")
const Category = require('../models/Category')
const upload = require('../middleware/upload')

moment.locale("ru");

router.post('/category/add' , async(req,res)=>{
  const cat = new Category({
    name:req.body.name,
    parentId: req.body.parentId
  })

  cat.save().then(res.json({msg:"Категория создана"}))
})

router.post('/category' , async(req,res)=>{
  const cat = await Category.find().lean()
  res.json({cat})
})

router.get('/category/:id' , async(req,res)=>{

  //limit
  const limit = 8;

  const data = await Post.paginate({category:req.params.id},{lean:true , limit:limit})
  const categories = await Category.find().sort({ $natural: -1 }).limit(20).lean()
  res.render('blog',{
    posts:data,
    searchCategory:req.params.id,
    categories:categories,

  })
})

router.post("/category/find", async(req,res)=>{
  if(req.body.categoryToFind){

    //limit
  const limit = 8;

    const cat = req.body.categoryToFind.toLowerCase()

    const data = await Post.paginate({category:cat},{lean:true , limit:limit})
    
    const categories = await Category.find().sort({ $natural: -1 }).limit(20).lean()


    res.render('blog',{
      posts:data,
      searchCategory:cat,
      categories:categories
    })
  }else{
    res.redirect('/blogPage')
  }
})

router.post("/category/delete/:id" , async(req,res)=>{
  const cat = await Category.findByIdAndDelete(req.params.id)
  res.redirect('/admin')
})

//ПОлучить все посты =======================

router.post('/posts' , async(req,res)=>{

  const posts = await Post.find().lean()
  res.json({posts
  })
})

// Одностраничный пост =======================

router.get('/posts/:id' , async(req,res)=>{
  const data = await Post.findOne({_id:req.params.id})
  
  res.render('singlePostPage' , {
    date: data.date,
    imageSrc:data.imageSrc,
    _id:data._id,
    title:data.title,
    text:data.text,
    category:data.category,
    createdAt:data.createdAt,
    updatedAt:data.updatedAt,
    __v:data.__v,
  })
})

//Добавление поста =========================

router.post('/posts/add' , upload.single('image') , async(req,res)=>{
    const data = req.body;

    const year = moment().format("YYYY")
    const month = moment().format("MMMM")
    const day = moment().format("D")
    const date = {
      year:year,
      month:month,
      day:day,
    }

    //Формирую массив !категория! и привожу всех в нижний регистр
    const categories = data.category.split('_');
    for(key in categories){
      categories[key] = categories[key].toLowerCase()
    }

    //перебираю массив категорий и добавляю в БД категории, которых еще нет
    async function coincidence(arr){
      for(key in arr){
        let coincid = await Category.findOne({name:arr[key]})
        if(coincid){
          continue 
        }else{
          const cat = new Category({
            name:arr[key]
          })
          cat.save()
        }
      }
    }

    coincidence(categories)

    const post = new Post({
      title: data.title,
      text: data.text,
      date:date,
      category:categories,
      imageSrc: req.file ? req.file.path : "путь к файлу не найден",
    })
    
      post.save().then(()=>{
      res.status(1)
    }).then(res.redirect('/blogPage?page=1'))
    
  })

  //Удаление поста =======================

  router.post('/posts/delete/:id' , (req,res)=>{
    Post.deleteOne({_id:req.params.id}).then((post)=>{
      if(post){
        res.redirect('/admin')
      }else{
        res.json({status:'error'})
      }
      
    })
  })

  //редактирование =======================

  router.get('/posts/update/:id' , async(req,res)=>{
    const data = await Post.findOne({_id:req.params.id})
    if(data.category){
      data.category = data.category.join().replace(/,/gi,'_')
    }
  
  res.render('updateSinglePostPage' , {
    date: data.date,
    imageSrc:data.imageSrc,
    _id:data._id,
    title:data.title,
    text:data.text,
    category:data.category,
  })
  })

  router.post('/posts/update/:id' ,upload.single('image') , async (req,res)=>{

    const imageSrc = req.body.imageSrc

    const categories = req.body.category.split('_');

    await Post.findByIdAndUpdate(req.params.id , {$set: req.body, imageSrc: req.file ? req.file.path : imageSrc, category:categories}).then(res.redirect('/admin'))
  })


  module.exports = router;