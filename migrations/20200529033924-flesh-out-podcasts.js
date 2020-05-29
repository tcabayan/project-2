'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.addColumn('Podcasts', 'description', Sequelize.TEXT),
      queryInterface.addColumn('Podcasts', 'copyright', Sequelize.STRING),
      queryInterface.addColumn('Podcasts', 'link', Sequelize.STRING),
      queryInterface.addColumn('Podcasts', 'imageUrl', Sequelize.STRING)
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.removeColumn('Podcasts', 'description'),
      queryInterface.removeColumn('Podcasts', 'copyright'),
      queryInterface.removeColumn('Podcasts', 'link'),
      queryInterface.removeColumn('Podcasts', 'imageUrl')
    ]);
  }
};
