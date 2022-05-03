module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW 
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING(191),    
    },
  }, 
  {
    timestamps: false
  });
  return Post;
};