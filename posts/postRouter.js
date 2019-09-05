const express = require('express');
const db = require('../posts/postDb')
const router = express.Router();

router.get('/', (req,res) =>{
    db.get().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

router.get('/:id', (req, res) =>{
    const {id} = req.params;

    db.getById(id)
    .then(post => {
        if(post){
        res.status(200).json(post)
        } else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err =>{
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.delete('/:id', (req,res)=>{
    const {id} = req.params;

    db.remove(id)
    .then(post =>{
        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        
    })
    .catch(err =>{
        res.status(500).json({ error: "The post could not be removed" })
    })
})

router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;

    changes.id && changes.text && changes.user_id? db.update(id, changes) .then(updated =>{
        if(updated){
            res.status(200).json(updated)
        } else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    }) .catch(err =>{
        res.status(500).json({ error: "The post information could not be modified." })
    }) : res.status(400).json({ errorMessage: "Please provide a title and contents for the post." })
 
    
})

// custom middleware

function validatePost(req, res, next) {
const post = req.body;

   if(post) {
       if(post.text){
           next()
       } else{
           res.status(400).json({ message: "missing required text field" })
       }

   } else{
       res.status(400).json({ message: "missing post data" })
   }
};

module.exports = router;