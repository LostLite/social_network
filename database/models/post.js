'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    photo: DataTypes.TEXT
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.user);
    Post.hasMany(models.comment);
  };
  return Post;
};