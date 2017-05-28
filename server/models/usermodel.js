'use strict';
module.exports = (sequelize, DataTypes) =>{
  const userModel = sequelize.define('userModel', {
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,   
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isLoggedIn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }  

  }, {
    classMethods: {
      associate: (models)=> {
        userModel.hasMany(models.docModel, {
          foreignKey: 'userId',
          as: 'userId',
        })
        userModel.belongsTo(models.roleModel, {
          foreignKey: 'roleId',
          as: 'user',
          onDelete: 'CASCADE',
        })
      }
    }
  });
  return userModel;
};