const { Router } = require("express");
const router = Router();
const Technology = require('../models/Technology')

router.post('/add' , async(req,res)=>{
    const data = req.body

    const technology = new Technology({
        name: data.name,
        technologies:data.technologies
    })

    await technology.save()
    res.json({msg:'сохранение завершено'})
})
router.post('/delete/:id' , async(req,res)=>{
    const id = req.params.id

    try{
        await Technology.findByIdAndDelete(id)
    }catch(e){
        res.json(e)
    }
    res.json({msg:'Удаление прошло успешно'})
})

router.post('/update' , async(req,res)=>{
    const name = req.body.name

    try{
        await Technology.findOneAndUpdate(name ,{$set: req.body})
    }catch(e){
        res.json(e)
    }

    res.json({msg:'Обновление прошло успешно'})
})

module.exports = router;