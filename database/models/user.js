'use strict';
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    hashed_password: DataTypes.STRING,
    password: {
      type:DataTypes.VIRTUAL,
      set:(password)=>{
        this.setDataValue('password', password),
        this.setDataValue('salt', uuidv1()),
        this.setDataValue('hashed_password', this.encryptPassword(password));
      }
    },
    salt: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };

  user.Instance.prototype.encryptPassword = password => {
    if(!password) return "";
    try {
      return crypto.createHmac('sha1',this.salt).update(password).digest('hex')
    } catch (error) {
      
    }
  };
  return user;
};