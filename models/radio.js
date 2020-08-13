'use strict';
module.exports = (sequelize, DataTypes) => {
  const Radio = sequelize.define('Radio', {
    alias: DataTypes.STRING,
    allowed_locations: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  Radio.associate = function(models) {
    // associations can be defined here
  };
  return Radio;
};
