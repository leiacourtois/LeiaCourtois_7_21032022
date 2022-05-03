const fs = require('fs');
const xss = require("xss");
const db = require("../models");
const Post = db.post;

exports.createPost = (req, res, next) => {
  //Init info
  const postObject = JSON.parse(req.body.post);

  const post = {
    text: xss(postObject.text),
    image : "",
    userId: xss(postObject.userId)
  };

  if (req.file) {
    post.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  console.log("ENVOIE À LA BASE DE DONNÉE!!!!!!!!!!!!!!!!!!!!!")
  //create new post
  Post.create(post)
    .then(data => {
      res.status(201).json({ message: 'Post créé !' })
    })
    .catch(error => res.status(500).json({ error }));
}; 