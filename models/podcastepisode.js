// model:generate --name PodcastEpisode --attributes name:string,publishDate:date,audioUrl:string

'use strict';

module.exports = (sequelize, DataTypes) => {
  const PodcastEpisode = sequelize.define('PodcastEpisode', {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration: DataTypes.STRING,
    publishDate: DataTypes.DATE,
    audioUrl: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    link: DataTypes.STRING,
    feedGuid: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {});

  PodcastEpisode.associate = function (models) {
    this.belongsTo(models.Podcast);
    this.hasMany(models.PodcastEpisodeUserData);
  };

  return PodcastEpisode;
};
