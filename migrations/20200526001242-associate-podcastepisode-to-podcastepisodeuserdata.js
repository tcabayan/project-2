// migration:generate --name associate-podcastepisode-to-podcastepisodeuserdata

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('PodcastEpisodeUserData', 'podcastEpisodeId', Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('PodcastEpisodeUserData', 'podcastEpisodeId');
  }
};
