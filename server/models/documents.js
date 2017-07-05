
module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [2, 1000000]
        }
      }
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Private'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    classMethods: {
      associate: (models) => {
        Documents.belongsTo(models.User, {
          foreignKey: 'userId',
          // as: 'userName',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Documents;
};
