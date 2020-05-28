'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('PodcastEpisodes', 'feedGuid', Sequelize.STRING)
      .then(() => queryInterface.addIndex('PodcastEpisodes', ['feedGuid']))
      .then(() => queryInterface.addConstraint('PodcastEpisodes', ['feedGuid'], {
        type: 'unique',
        name: 'feedGuid_unique'
      }));
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('PodcastEpisodes', 'feedGuid');
  }
};
