const db = require("../models");
const Comment = db.comment;
const xss = require("xss");

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
  Comment.findByPk(req.params.id)
    .then(comment => {
      Comment.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'deleted object'}))
          .catch(error => res.status(400).json({ error }));
      })
    .catch(error => res.status(500).json({ error }));
}
