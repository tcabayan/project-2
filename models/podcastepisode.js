// model:generate --name PodcastEpisode --attributes name:string,publishDate:date,audioUrl:string

'use strict';

const sanitizeHtml = require('sanitize-html');

module.exports = (sequelize, DataTypes) => {
  const PodcastEpisode = sequelize.define('PodcastEpisode', {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration: DataTypes.STRING,
    publishDate: DataTypes.DATE,
    audioUrl: DataTypes.STRING,
    imageUrl: DataTypes.STRING(1024),
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

  PodcastEpisode.addHook('afterValidate', (data, options) => {
    data.description = sanitizeHtml(data.description);
  });
  return PodcastEpisode;
};
