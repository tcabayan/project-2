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
      queryInterface.changeColumn(
        'PodcastUserData',
        'userId',
        {
          type: Sequelize.UUID,
          allowNull: false
        }),
      queryInterface.changeColumn(
        'PodcastUserData',
        'podcastId',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        })
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
      queryInterface.changeColumn('PodcastUserData', 'userId', Sequelize.UUID),
      queryInterface.changeColumn('PodcastUserData', 'podcastId', Sequelize.INTEGER)
    ]);
  }
};
