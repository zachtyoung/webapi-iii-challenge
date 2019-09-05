const express = require('express');

 const userRouter = require('./users/userRouter');
 const postRouter = require('./posts/postRouter');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use('/users',logger, userRouter);
server.use('/posts',logger, postRouter);

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );

  next();
}

module.exports = server;
