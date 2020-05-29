'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.addColumn('PodcastEpisodes', 'author', Sequelize.STRING),
      queryInterface.addColumn('PodcastEpisodes', 'description', Sequelize.TEXT),
      queryInterface.addColumn('PodcastEpisodes', 'duration', Sequelize.INTEGER),
      queryInterface.addColumn('PodcastEpisodes', 'imageUrl', Sequelize.STRING),
      queryInterface.addColumn('PodcastEpisodes', 'link', Sequelize.STRING)
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
      queryInterface.removeColumn('PodcastEpisodes', 'author'),
      queryInterface.removeColumn('PodcastEpisodes', 'description'),
      queryInterface.removeColumn('PodcastEpisodes', 'duration'),
      queryInterface.removeColumn('PodcastEpisodes', 'imageUrl'),
      queryInterface.removeColumn('PodcastEpisodes', 'link')
    ]);
  }
};
