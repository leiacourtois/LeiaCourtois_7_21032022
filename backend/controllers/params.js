const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const db = require('../models');
const fs = require('fs');
const xss = require("xss");
const User = db.user;
const Post = db.post;
let schemaPassword = new passwordValidator();

schemaPassword
.is().min(8)                                   
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits(2)                              
.has().not().spaces();

exports.getParams = (req, res, next) => {
   User.findByPk(req.params.id)
  .then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyUserParams = (req, res, next) => {
  const paramsObject = JSON.parse(req.body.newUser);

  const params = {
    pseudo: xss(paramsObject.pseudo),
    email : xss(paramsObject.email),
    bio : xss(paramsObject.bio),
    picture : "",
    id: xss(paramsObject.id)
  };

    
  User.findByPk(req.params.id)
    .then(user => {
      if (req.file) {
        params.picture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } else{
        params.picture = user.picture
      }
      if(user.id == params.id){
        if(user.picture != null){
          const filename = user.picture.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
          User.update(params, { where: { id: req.params.id } })
            .then(() => res.status(200).json(params))
            .catch(error => res.status(400).json({ error }));
          });
        } else{
          User.update(params, { where: { id: req.params.id } })
            .then(() => res.status(200).json(params))
            .catch(error => res.status(400).json({ error }));
        }
      } else{
        return res.status(403).json({ error: 'unauthorized request.' });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyPasswordParams = (req, res, next) => {
  User.findByPk(req.params.id)
  .then(user => {
    bcrypt.compare(req.body.oldpassword, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'incorrect password' });
      }
      const isValid = schemaPassword.validate(req.body.newpassword)
      if(isValid){
        bcrypt.hash(req.body.newpassword, 10)
        .then(newpassword => {
          let params = {
            password : newpassword
          }
          User.update(params, { where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'settings changed'}))
          .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
      } else{
        return res.status(400).json({ error: 'password not strong enough' });
      }
    })
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({message: 'oups, pas marché '}));

};

exports.deleteUser = (req, res, next) => {
  Post.findAll({ where: { userId: req.params.id } })
    .then(posts => {
      posts.forEach(post => {
        if(post.image){
          const filename = post.image.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Post.destroy({ where: { userId: req.params.id } })
              .then(() => res.status(200).json({ message: 'deleted object'}))
              .catch(error => res.status(400).json({ error }));
          });
        } else{
          Post.destroy({ where: { userId: req.params.id } })
              .then(() => res.status(200).json({ message: 'deleted object'}))
              .catch(error => res.status(400).json({ error }));
        }
      });
    })
    .catch(error => res.status(500).json({ error }));

  User.findByPk(req.params.id)
    .then(user => {
      if(user.picture){
        const filename = user.picture.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          User.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'deleted user'}))
            .catch(error => res.status(400).json({ error }));
        });
      } else{
        User.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'deleted user'}))
            .catch(error => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));

};

