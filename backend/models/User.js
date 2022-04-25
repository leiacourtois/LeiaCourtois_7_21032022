module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    pseudo: {
      type: Sequelize.STRING(50),
      allowNull: false    
    },
    email: {
      type: Sequelize.STRING(150),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    bio:{
      type: Sequelize.TEXT,
      allowNull: true
    }
  }, 
  {
    timestamps: false
  });
  return User;
};