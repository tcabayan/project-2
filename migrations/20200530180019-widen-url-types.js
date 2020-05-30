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
      queryInterface.changeColumn('Podcasts', 'copyright', Sequelize.TEXT),
      queryInterface.changeColumn('Podcasts', 'link', Sequelize.STRING(1024)),
      queryInterface.changeColumn('PodcastEpisodes', 'audioUrl', Sequelize.STRING(1024)),
      queryInterface.changeColumn('PodcastEpisodes', 'link', Sequelize.STRING(1024))
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
      queryInterface.changeColumn('Podcasts', 'copyright', Sequelize.STRING),
      queryInterface.changeColumn('Podcasts', 'link', Sequelize.STRING),
      queryInterface.changeColumn('PodcastEpisodes', 'audioUrl', Sequelize.STRING),
      queryInterface.changeColumn('PodcastEpisodes', 'link', Sequelize.STRING)
    ]);
  }
};
