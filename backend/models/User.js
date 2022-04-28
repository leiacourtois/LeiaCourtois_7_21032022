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
      type: Sequelize.STRING(191),
      allowNull: false
    },
    bio:{
      type: Sequelize.TEXT,
      allowNull: true
    },
    picture:{
      type: Sequelize.STRING(191),
      allowNull: true,
      defaultValue: null
    }
  }, 
  {
    timestamps: false
  });
  return User;
};