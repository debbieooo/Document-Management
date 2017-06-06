const bcrypt = require('bcrypt-nodejs');

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
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      }
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

  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Doc, {
          foreignKey: 'userId',
        //   as: 'docs',
        });
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
        //   as: 'role',
          onDelete: 'CASCADE',
        });
      }
    },
    instanceMethods: {
      encryptPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      },
      validate(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    hooks: {
      beforeCreate(user) {
        user.encryptPassword();
      }
    }
  });
  return User;
};
