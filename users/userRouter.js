const express = require('express');
const db = require('../users/userDb')
const router = express.Router();

router.get('/', (req,res) =>{
    db.get().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({ error: "The user information could not be retrieved." })
    })
})


router.post('/:id/posts', (req, res) => {
    const {id} = req.params;
    const post = req.body;

    post.text && post.user_id ?  db.insert(post).then(newPost =>{
        res.status(201).json(newPost);
    }) : res.status(400).json({ errorMessage: "Please provide a text and id for the post." })
   
    .catch(err =>{
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
    

});

router.post('/', (req, res) => {
    const userInfo = req.body;
    userInfo.name  ?  db.insert(userInfo).then(newUser =>{
        res.status(201).json(newUser);
    }) : res.status(400).json({ errorMessage: "Please provide a name for the user." })
   
    .catch(err =>{
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
});

router.get('/:id', (req, res) =>{
    const {id} = req.params;

    db.getById(id)
    .then(user => {
        if(user){
        res.status(200).json(user)
        } else{
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err =>{
        res.status(500).json({ error: "The user information could not be retrieved." })
    })
})

router.get('/:id/posts', (req, res) =>{
    const {id} = req.params;

    db.getUserPosts(id)
    .then(posts => {
        if(posts){
        res.status(200).json(posts)
        } else{
            res.status(404).json({ message: "The posts with the specified ID does not exist." })
        }
    })
    .catch(err =>{
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
    .then(user =>{
        if(post){
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
        
    })
    .catch(err =>{
        res.status(500).json({ error: "The user could not be removed" })
    })
});

router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;

    changes.name ? db.update(id, changes) .then(updated =>{
        if(updated){
            res.status(200).json(updated)
        } else{
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    }) .catch(err =>{
        res.status(500).json({ error: "The user information could not be modified." })
    }) : res.status(400).json({ errorMessage: "Please provide a name for the user." })
 
    
})


//custom middleware

function validateUserId(req, res, next) {
    const {id} = req.params;
    db.get(id)
    .then(foundId =>{
        if(foundId){
            req.user = foundId;
        } else{
             res.status(400).json({ message: "invalid user id" });
        }
    })

};

function validateUser(req, res, next) {

    const user = req.body;
    if(user){
        if(user.name){
            next()
        } else{
            res.status(400).json({ message: "missing required name field" })
        }
    }else{
        res.status(400).json({ message: "missing user data" })
    }
};

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
