const fs = require('fs');
const xss = require("xss");
const db = require("../models");
const Post = db.post;
const User = db.user;
const Comment = db.comment;

exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);

  const post = {
    text: xss(postObject.text),
    image : "",
    userId: xss(postObject.userId)
  };

  if (req.file) {
    post.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  Post.create(post)
    .then(data => {
      res.status(201).json({ data });    
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    include: [
      {
        model : Comment,
        as: 'comments',
        include: ['user']
      }, 
      "user"
    ],
    order: [
      ['date', 'DESC'],
      ['comments', 'date', 'DESC']
    ]
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
        include: [
          {
            model : Comment,
            as: 'comments',
            include: ['user']
          }
        ]
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

exports.deletePost = (req, res, next) => {
  Post.findByPk(req.params.id)
    .then(post => {
      if(post.image){
        const filename = post.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'deleted object'}))
            .catch(error => res.status(400).json({ error }));
        });
      } else{
        Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'deleted object'}))
            .catch(error => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
};
