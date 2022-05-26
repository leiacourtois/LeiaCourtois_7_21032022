require('dotenv').config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(`${process.env.DATABASE}`, `${process.env.DB_USER}`, `${process.env.PASSWORD}`, {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
});

//sequelize.sync(); 

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./User.js")(sequelize, Sequelize);
db.post = require("./Post.js")(sequelize, Sequelize);
db.role = require("./Role.js")(sequelize, Sequelize);
db.comment = require("./Comment.js")(sequelize, Sequelize);

db.role.hasMany(db.user, { as: "users" , foreignKey: { allowNull: false }});
db.user.belongsTo(db.role, {
  foreignKey: "roleId",
  as: "role",
});

db.user.hasMany(db.post, { as: "posts", onDelete: 'CASCADE', foreignKey: { allowNull: false }});
db.post.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

db.user.hasMany(db.comment, { as: "comments", onDelete: 'CASCADE', foreignKey: { allowNull: false }});
db.comment.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

db.post.hasMany(db.comment, { as: "comments", onDelete: 'CASCADE', foreignKey: { allowNull: false }});
db.comment.belongsTo(db.post, {
  foreignKey: "postId",
  as: "post",
});

module.exports = db;

