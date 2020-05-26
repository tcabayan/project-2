// model:generate --name PodcastEpisode --attributes name:string,publishDate:date,audioUrl:string

'use strict';

module.exports = (sequelize, DataTypes) => {
  const PodcastEpisode = sequelize.define('PodcastEpisode', {
    name: DataTypes.STRING,
    publishDate: DataTypes.DATE,
    audioUrl: DataTypes.STRING
  }, {});

  PodcastEpisode.associate = function (models) {
    this.belongsTo(models.Podcast);
    this.hasMany(models.PodcastEpisodeUserData);
  };

  return PodcastEpisode;
};

// db.PodcastEpisode.create({name: 'test', Podcast: <podcast>})
