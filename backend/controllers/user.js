require('dotenv').config()
const passwordValidator = require('password-validator');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;
let schemaPassword = new passwordValidator();

schemaPassword
.is().min(8)                                   
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits(2)  
.has().symbols()                              
.has().not().spaces();

const schema = Joi.object({
    email: Joi.string().email()
})

exports.signup = (req, res, next) => {
  let myObj = {
    email: req.body.email
  };
  const result = schema.validate(myObj);
  const isValid = schemaPassword.validate(req.body.password)
  if(!result.error && isValid){
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = {
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
        roleId: 1
      };
      console.log(user)
      User.create(user)
      .then(() => res.status(201).json({ message: 'user created' }))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  } else{
    return res.status(400).json({ error: 'incorrect password' });
  }
};

exports.login = (req, res, next) => {
  User.findAll({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'user not found ' });
      }
      bcrypt.compare(req.body.password, user[0].password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'incorrect password' });
          }
          res.status(200).json({
            id: user[0].id,
            token: jwt.sign(
              { id: user[0].id },
              process.env.SECRET_KEY,
              { expiresIn: '24h' }
            ),
            pseudo: user[0].pseudo,
            picture: user[0].picture,
            role: user[0].roleId
            
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};