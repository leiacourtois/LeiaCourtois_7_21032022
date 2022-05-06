const fs = require('fs');
const xss = require("xss");
const db = require("../models");
const Post = db.post;
const User = db.user;

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
  //create new post
  Post.create(post)
    .then(data => {
      res.status(201).json({ data });    
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    include: ["user"],
    order: [['date', 'DESC']]
  }).then(
    (posts) => {
      res.status(200).json(posts);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllUserPosts = (req, res, next) => {
  const id = req.params.id;
   User.findByPk(id, {
    include: [
      { 
        model : Post,
        as: 'posts',
      },
    ],
    order: [
      ['posts', 'date', 'DESC'],
    ]
  })
  .then(
    (posts) => {
      res.status(200).json(posts);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
