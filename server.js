const express = require('express');

 const userRouter = require('./users/userRouter');
 const postRouter = require('./posts/postRouter');

const server = express();

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use('/users', userRouter);
server.use('/posts', postRouter);

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );

  next();
}
function validateUserId(req,res,next){

}
function validateUser(req,res,next){

}
function validatePost(req, res, next){

}

module.exports = server;
