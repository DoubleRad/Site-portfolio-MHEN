const Post = require("../models/Post");

class PostController {
     index(req,res){
      const posts = Post.find().lean()
      res.json({posts
      })
    }
     create(req,res){
      const data = req.body;
      const post = new Post({
        title: data.title,
        text: data.text
      })
      post.save().then(()=>{
        res.status(1)
      }).then(res.redirect('/admin'))
    }
     read(req,res){
      Post.findOne({_id:req.params.id}).then((post)=>{
          if(!post){
              res.send({error:'not found'})
          }else{
              res.json(post)
          }
      })
  }
   update(req,res){
      Post.findByIdAndUpdate(req.params.id , {$set: req.body} , (err)=>{
        if (err) { res.send(err) };
        res.json({status:"updated"})
        }
      )
    }
    
     delete(req,res){
      Post.remove({_id:req.params.id}).then((post)=>{
        if(post){
          res.json({status:'deleted'})
        }else{
          res.json({status:'error'})
        }
        
      })
    }
}

module.exports = PostController;