const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const fs = require('fs');
const xss = require("xss");
const User = db.user;
//let schemaPassword = new passwordValidator();

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
            .then(() => res.status(200).json(user))
            .catch(error => res.status(400).json({ error }));
          });
        } else{
          User.update(params, { where: { id: req.params.id } })
            .then(() => res.status(200).json(user))
            .catch(error => res.status(400).json({ error }));
        }
      } else{
        return res.status(403).json({ error: 'unauthorized request.' });
      }
    })
    .catch(error => res.status(500).json({ error }));
};