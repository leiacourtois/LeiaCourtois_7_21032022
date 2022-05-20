const db = require("../models");
const Comment = db.comment;
const xss = require("xss");
require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.createComment = (req, res, next) => {
  const comment = {
    text: xss(req.body.text),
    userId: xss(req.body.userId),
    postId: xss(req.body.postId)
  };

  Comment.create(comment)
    .then(data => {
      res.status(201).json({ data });    
    })
    .catch(error => res.status(500).json({ error }));
}

exports.deleteComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decodedToken.id;
  const userRole = decodedToken.role;
  Comment.findByPk(req.params.id)
    .then(comment => {
      if (userId == comment.userId || userRole == 2) {
        Comment.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'deleted object'}))
          .catch(error => res.status(400).json({ error }));
      } else{
        return res.status(401).json({ error: 'Unauthorized' });
      }
      })
    .catch(error => res.status(500).json({ error }));
}
