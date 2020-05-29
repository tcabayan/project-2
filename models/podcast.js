// model:generate --name Podcast --attributes name:string,author:string,rssUrl:string

'use strict';

const sanitizeHtml = require('sanitize-html');

module.exports = (sequelize, DataTypes) => {
  const Podcast = sequelize.define('Podcast', {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT,
    copyright: DataTypes.STRING,
    link: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    rssUrl: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {});

  Podcast.associate = function (models) {
    this.hasMany(models.PodcastEpisode);
    this.hasMany(models.PodcastUserData);
  };

  Podcast.addHook('afterValidate', (data, options) => {
    data.description = sanitizeHtml(data.description);
  });

  return Podcast;
};
