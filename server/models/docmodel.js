'use strict';
module.exports = (sequelize, DataTypes) => {
  const docModel = sequelize.define('docModel', {
    title: {
      types: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Private'
    },

  }, {
    classMethods: {
      associate: (models) => {
          docModel.belongsTo(models.userModel, {
          foreignKey: 'userId',
          // as: 'userId',
          onDelete: 'CASCADE',
        })
      }
    }
  });
  return docModel;
};