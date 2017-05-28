'use strict';
module.exports = (sequelize, DataTypes) => {
  const roleModel = sequelize.define('roleModel', {
    userRoles: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        roleModel.hasMany(models.userModel, {
          foreignKey: 'roleId',
          as: 'user',
        })
      }
    }
  });
  return roleModel;
};
