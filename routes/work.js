const { Router } = require("express");
const router = Router();
const Project = require('../models/Project')
const upload = require('../middleware/upload')
const moment = require('moment')

router.post('/add', upload.single('image'), async (req,res)=>{

    const data = req.body
  
    const day = moment().format("D")
    const month = moment().format("MMMM")
    const year = moment().format("YYYY")
  
    const categories = data.category.split('_');
  
    const project = new Project({
      title:data.title,
      subtitle:data.subtitle,
      text:data.text,
      imageSrc: req.file ? req.file.path : "путь к файлу не найден",
      date:{
        day:day,
        month:month,
        year:year
      },
      category:categories,
    })
  
    await project.save().then(res.redirect('/works'))
  
  })

  router.post('/findAll', async(req,res)=>{
      const data = await Project.find().lean();

      res.json({...data})
  })

  router.get("/findOne/:id", upload.single('image'), async(req,res)=>{
      const data = await Project.findById(req.params.id).lean()
      res.render('singleProjectPage',{
        data,
      })
  })

  router.post('/update/:id' ,upload.single('image'), async(req,res)=>{

    const imageSrc = req.body.imageSrc;

    const promise = await Post.findByIdAndUpdate(req.params.id , {$set: req.body, imageSrc: req.file ? req.file.path : imageSrc}).then(res.redirect('/works'))

    if(!promise){
        res.json({msg:'Ошибка обновления'})
    }else{
        res.json({msg:'Успешно обновлено'})
    }

  })

  router.post('/delete/:id', upload.single('image'), async (req,res)=>{

    const id = req.params.id;

    const promise = await Project.findByIdAndDelete(id);
    if(!promise){
        res.json({msg:'Ошибка'})
    }else{
        res.redirect('/admin')
    }

  });

  
module.exports = router;