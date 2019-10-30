'use strict';
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    hashed_password: DataTypes.STRING,
    password: {
      type:DataTypes.VIRTUAL,
      set:function(val){
        this.setDataValue('password', val),
        this.setDataValue('salt', uuidv1()),
        this.setDataValue('hashed_password', this.encryptPassword(val));
      }
    },
    salt: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.post);
  };

  User.prototype.authenticate = function(plainText){
    return this.encryptPassword(plainText) === this.hashed_password;
  };

  User.prototype.encryptPassword = function(val){
    if(!val) return "";
    try {
      return crypto.createHmac('sha1',this.salt).update(val).digest('hex')
    } catch (error) {
      
    }
  };

  return User;
};