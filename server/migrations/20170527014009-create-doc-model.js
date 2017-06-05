

module.exports = {
  up: (queryInterface, Sequelize) =>
     queryInterface.createTable('Docs', {
       id: {
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
         type: Sequelize.INTEGER
       },
       userId: {
         type: Sequelize.STRING
       },
       title: {
         type: Sequelize.STRING
       },
       content: {
         type: Sequelize.STRING
       },
       access: {
         type: Sequelize.STRING
       },
       createdAt: {
         allowNull: false,
         type: Sequelize.DATE
       },
       updatedAt: {
         allowNull: false,
         type: Sequelize.DATE
       }
     }),
  down: (queryInterface, Sequelize) =>
   queryInterface.dropTable('Docs')
};
