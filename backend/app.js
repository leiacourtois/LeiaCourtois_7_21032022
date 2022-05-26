const rateLimit = require('express-rate-limit')
const express = require('express');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const paramsRoutes = require('./routes/params');
const commentRoutes = require('./routes/comment');
const path = require('path');
const db = require('./models');

const limiterLogin = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}) 

db.sequelize.sync({ force: true }).then(() => {
  db.role.create({ name : "employé" })
  db.role.create({ name : "admin" })
  console.log("Drop and re-sync db.");
});

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/post', postRoutes);
app.use('/api/params', paramsRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth', limiterLogin, userRoutes);
module.exports = app;