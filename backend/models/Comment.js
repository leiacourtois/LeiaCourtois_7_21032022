module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    text: {
      type: Sequelize.TEXT('tiny'),
      allowNull: false
    }
  }, 
  {
    timestamps: false
  });
  return Comment;
};