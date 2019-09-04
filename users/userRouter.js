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

});

router.post('/', (req, res) => {

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

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
