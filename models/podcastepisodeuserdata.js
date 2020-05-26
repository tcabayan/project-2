// model:generate --name PodcastEpisodeUserData --attributes played:boolean

'use strict';

module.exports = (sequelize, DataTypes) => {
  const PodcastEpisodeUserData = sequelize.define('PodcastEpisodeUserData', {
    played: DataTypes.BOOLEAN
  }, {});

  PodcastEpisodeUserData.associate = function (models) {
    this.belongsTo(models.User);
    this.belongsTo(models.PodcastEpisode);
  };

  return PodcastEpisodeUserData;
};
