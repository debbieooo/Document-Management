module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // userId: {
    //   type: DataTypes.INTEGER,
    //   unique: true,
    //   allowNull: false
    // },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
      default: 2,
    },
    // isLoggedIn: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    // }

  }, {
    classMethods: {
      associate: (models) => {
        // User.hasMany(models.Doc, {
        //   foreignKey: 'userId',
        // //   as: 'userId',
        // });
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
        //   as: 'user',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return User;
};
