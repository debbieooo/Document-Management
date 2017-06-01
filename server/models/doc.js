
module.exports = (sequelize, DataTypes) => {
  const Doc = sequelize.define('Doc', {
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Private'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  }, {
    classMethods: {
      associate: (models) => {
        Doc.belongsTo(models.User, {
          foreignKey: 'userId',
          // as: 'userId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Doc;
};
